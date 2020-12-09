provider "helm" {
  kubernetes {
    load_config_file = true

    cluster_ca_certificate = file("~/.kube/cluster-ca-cert.pem")
  }
}

locals {
  kubeshield_release_name = "identity-server"
  kubeshield_namespace    = "kube-system"
}

locals {
  kubeshield_chart_name = "identity-server"

  # re-implement: https://github.com/kubeshield/identity-server/blob/0.3.0/charts/identity-server/templates/_helpers.tpl#L9-L20
  # in hcl
  kubeshield_release_fullname = length(regexall("\\Q${local.kubeshield_chart_name}\\E", local.kubeshield_release_name)) != 0 ? trimsuffix(substr(local.kubeshield_release_name, 0, 63), "-") : trimsuffix(substr("${local.kubeshield_release_name}-${local.kubeshield_chart_name}", 0, 63), "-")
}

data "helm_repository" "appscode" {
  name = "appscode"
  url  = "https://charts.appscode.com/stable"
}

resource "tls_private_key" "kubeshield_ca" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "tls_self_signed_cert" "kubeshield_ca" {
  key_algorithm   = tls_private_key.kubeshield_ca.algorithm
  private_key_pem = tls_private_key.kubeshield_ca.private_key_pem

  subject {
    common_name = "ca"
  }

  validity_period_hours = 87600
  set_subject_key_id    = false

  is_ca_certificate = true
  allowed_uses = [
    "digital_signature",
    "key_encipherment",
    "cert_signing",
    "server_auth",
    "client_auth"
  ]
}

resource "tls_private_key" "kubeshield_server" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "tls_cert_request" "kubeshield_server" {
  key_algorithm   = tls_private_key.kubeshield_server.algorithm
  private_key_pem = tls_private_key.kubeshield_server.private_key_pem

  subject {
    common_name = local.kubeshield_release_fullname
  }

  dns_names = [
    "${local.kubeshield_release_fullname}.${local.kubeshield_namespace}",
    "${local.kubeshield_release_fullname}.${local.kubeshield_namespace}.svc"
  ]
}

resource "tls_locally_signed_cert" "kubeshield_server" {
  ca_key_algorithm   = tls_self_signed_cert.kubeshield_ca.key_algorithm
  ca_private_key_pem = tls_private_key.kubeshield_ca.private_key_pem
  ca_cert_pem        = tls_self_signed_cert.kubeshield_ca.cert_pem

  cert_request_pem = tls_cert_request.kubeshield_server.cert_request_pem

  validity_period_hours = 87600
  set_subject_key_id    = false

  allowed_uses = [
    "digital_signature",
    "key_encipherment",
    "server_auth",
    "client_auth"
  ]
}

resource "helm_release" "kubeshield" {
  name = local.kubeshield_release_name

  namespace = local.kubeshield_namespace

  # executing locally, from in chart folder
  chart = "../identity-server"

  # executing from published chart
  #   repository = data.helm_repository.appscode.metadata[0].name
  #   chart = "identity-server"
  #   version    = "0.2.0"

  set {
    name  = "apiserver.servingCerts.generate"
    value = "false"
  }

  set_sensitive {
    name  = "apiserver.ca"
    value = base64encode(file("~/.kube/cluster-ca-cert.pem"))
  }

  set_sensitive {
    name  = "apiserver.servingCerts.caCrt"
    value = base64encode(tls_self_signed_cert.kubeshield_ca.cert_pem)
  }

  set_sensitive {
    name  = "apiserver.servingCerts.serverKey"
    value = base64encode(tls_private_key.kubeshield_server.private_key_pem)
  }

  set_sensitive {
    name  = "apiserver.servingCerts.serverCrt"
    value = base64encode(tls_locally_signed_cert.kubeshield_server.cert_pem)
  }
}
