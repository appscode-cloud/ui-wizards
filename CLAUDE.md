# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Go project for UI Wizards, a Helm chart registry for ByteBuilders that provides UI editor options for various Kubernetes resources, particularly focused on KubeDB database operators and other cloud-native tools. The repository contains hundreds of Helm charts for different Kubernetes resources and database configurations.

## Architecture

### Core Components

- **APIs (`apis/`)**: Contains Kubernetes API definitions
  - `apis/wizards/v1alpha1/`: Contains Go types for wizard configurations, including database editor options for MySQL, PostgreSQL, MongoDB, Redis, Elasticsearch, and other KubeDB resources
  - Key types include database-specific editor options (e.g., `KubedbcomMysqlEditorOptions`, `KubedbcomPostgresEditorOptions`)
  - Common types for machine configurations, persistence, storage classes, and backup/restore operations

- **Charts (`charts/`)**: Contains 800+ Helm charts for Kubernetes resource editors
  - Each chart represents a UI editor for specific Kubernetes resources (e.g., `kubedbcom-mysql-editor-options`)
  - Charts follow consistent naming pattern: `{group}{apiversion}-{resource}-editor[-options]`
  - Include database editors for KubeDB, cert-manager, cluster management, and various operators

- **Code Generation (`hack/`)**: Scripts for generating boilerplate code
  - Uses controller-gen and client-go code generators
  - Generates CRDs, OpenAPI specs, and client libraries

## Common Development Commands

### Building
```bash
make build                    # Build the binary
make all                      # Format and build
make all-build                # Build for all platforms
```

### Code Generation
```bash
make gen                      # Generate all code (clientset, manifests, chart docs)
make clientset                # Generate client libraries
make gen-crds                 # Generate CRD manifests
make openapi                  # Generate OpenAPI schemas
make gen-chart-doc            # Generate chart documentation
make gen-values-schema        # Generate values schema for charts
```

### Development Workflow
```bash
make fmt                      # Format code and copy data files
make dev                      # Run gen and fmt
make lint                     # Run linter with additional checks
make test                     # Run unit tests
make verify                   # Verify generated code and modules are up to date
```

### Chart Operations
```bash
make update-charts CHART_VERSION=v1.2.3    # Update chart versions
make package-charts                          # Package all charts
make ct                                     # Run chart tests (lint-and-install)
make capi-tests                             # Test charts with CAPI configurations
```

### Helm Chart Testing
Use the examples from README.md for testing individual charts:
```bash
# MySQL
helm install kubedbcom-mysql-editor-options charts/kubedbcom-mysql-editor-options
helm install kubedbcom-mysql-editor-options charts/kubedbcom-mysql-editor-options --set spec.mode=GroupReplication

# PostgreSQL
helm install kubedbcom-postgres-editor-options charts/kubedbcom-postgres-editor-options --set spec.mode=Cluster
```

## Key File Locations

- **Main module**: `go.bytebuilders.dev/ui-wizards`
- **API types**: `apis/wizards/v1alpha1/` - Contains all the editor option types
- **Generated code**: `apis/wizards/v1alpha1/zz_generated.deepcopy.go`, `openapi_generated.go`
- **Build scripts**: `hack/build.sh`, `hack/fmt.sh`, `hack/test.sh`
- **Chart templates**: Each chart in `charts/` follows standard Helm structure

## Development Environment

- **Go Version**: 1.22.1+ (toolchain 1.23.6)
- **Build Image**: `ghcr.io/appscode/golang-dev:1.25`
- **Dependencies**: Uses vendor/ directory for dependency management
- **Container-based builds**: All build/test operations run in Docker containers

## Important Notes

- The project generates extensive boilerplate code - always run `make gen` after API changes
- Charts are auto-generated from CRDs - modify the Go types, not the charts directly
- All builds and tests run in containerized environments for consistency
- The repository contains database-specific configurations for various operators (KubeDB, Stash, KubeStash)
- Chart versions and app versions are managed through Make variables (`CHART_VERSION`, `APP_VERSION`)