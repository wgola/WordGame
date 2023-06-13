# :cloud: Kubernetes config

The `.yaml` files stored in this directory can be used to deploy the app in the Kubernetes cluster.
In order to run it, first you have to create `wordgame-secret.yaml` file according to `wordgame-secret.yaml.example` template.
Information stored in this file is used to manage connections to Keycloak, PostgreSQL and MongoDB Atlas databases.

When it's done, you have to apply every file using following command:

```
$ kubectl apply -f <file_name>
```

After applying all files, app will be available at `http://localhost`.
