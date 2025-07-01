# Smart Note `In-progress`
Build an electrical form that allows users to take turn to fill in and sign step by step.
In this project, we basically have:
- Backend by NodeJS with NestJS framework
- Frontend by NextJS

This version is simple monolith app. By using NestJS, we easily scale this app to microservice in future.

Check my other repository out if you want to see NodeJS, NextJS with Mongoose: [Shopee](https://github.com/nctruong/shopee)

## Table of Contents
<!--toc:start-->

- [Table of Contents](#table-of-contents)
- [Demo Video](#demo-video)
- [Repository Structure](#repository-structure)
- [System Architecture](#system-architecture)
- [Installation and Usage](#installation-and-usage)
    - [Development](#development)
    - [Production](#production)
- [CI/CD Pipeline](#cicd-pipeline)
<!--toc:end-->

## Demo Video
![Admin](./images/admin.png)

To be continued...
## Repository Structure

The repository is organized into distinct directories, each serving a specific purpose.
```
.
├── infra/                  # Contains the k8s configuration
├── frontend/               # NextJS code for client UI
├── backend/                # NodeJS (NestJS) for server side
├── eks-cluster/            # Terraform to deploy AWS
├── .github/                # Github CI/CD workflow
└── images                  # System pictures
```
## System Architecture
## Installation and Usage
### Development

### Production
Using Terraform to deploy into AWS cluster (updating...)
## CI/CD Pipeline
Using github workflow:
`deploy to main` -> `github action builds and pushes images to docker` -> `change image tag in yml` -> `argo sync`

## More Info
### Tech Stacks
- NestJS && NextJS
- GraphQL
- Elasticsearch
- Docker & Kubernetes
- CI/CD
- Stress Test
- Security Test
- Datadog, Sentry, NewRelic
- NextJS
- Caching
- Rate Limit
- Multi-tenant

### Non-Functional Requirement
- Readability
- Performance: The system shall handle 2000 concurrent users with an average response time under 300 milliseconds.
- Security
- Scalability
- Reliability
- Availability
- Maintainability
- Supportability: logging & monitoring, alert
- Usability: UX/UI
- Portability: containerization
- Interoperability: integrate with external system by API, GraphQL, JSON
- Testability: automation test
- Compliance: data retention policy

### Terraform
https://developer.hashicorp.com/terraform/tutorials/kubernetes/eks
```
aws eks --region $(terraform output -raw region) update-kubeconfig \
    --name $(terraform output -raw cluster_name)
```
### Argo
```
kubectl create namespace argo
kubectl -n argo create token argo-user
```

### Argocd
Apply argocd.yaml first, before running skaffold.
Argocd read application.yml from git, not in local source. Push changes to git first.
login by `admin` and below secret:
```
kubectl get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo
```

### Typical Issues and Solutions
FailedBinding
volume "postgres-pv" already bound to a different claim.
```kubectl patch pv postgres-pv -p '{"spec":{"claimRef": null}}'```
If pvc stucks at deleting:
```kubectl patch pvc postgres-pvc -n default -p '{"metadata":{"finalizers":null}}' --type=merge```
Create the PV first, then the PVC. If PVC has issue, maybe something wrong with PV. Perhaps PV was bound to legacy PVC.
Try to delete PVC, then delete or change claimRef of PV to null like above.

# License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
