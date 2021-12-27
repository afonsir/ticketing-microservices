## Minikube

- Create cluster:

```bash
minikube start
```

- Delete cluster

```bash
minikube delete
```

- Stop cluster:

```bash
minikube stop
```

- Enable Ingress Controller:

```bash
minikube addons enable ingress
```

- Get external cluster IP address:

```bash
minikube ip
```

## Skaffold

- Start deployment:

```bash
skaffold dev
```

## Kubernetes

- Create a JWT secret:

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=<SECRET_VALUE>
```
