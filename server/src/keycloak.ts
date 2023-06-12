export const config = {
  "confidential-port": 8443,
  realm: "WordGame",
  "auth-server-url": "http://localhost:8080/",
  "ssl-required": "external",
  resource: "WordGameServer",
  realmPublicKey:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx3D0l3vyVRFQ8maE8QPXh/8hm3acTvnM8hLrpi99eanbXraMvmVaVrvoyYr1993few8Twk9csnjnTU0agFIhLfWOrdld7/dHZIuLQdmkJv1f5xtNWdg4C74i1BMtMfaukcR8sdcRWbLIbwCAJ53K3T2njefwPqb6QxE0vej2B3ve1VwctxzTckchTKgtOD99oX2w9fJDJGMpdjkrspG8FhTk7p2BUnvAtzyXUoS7lkJ965hJnr4KNEkZS1CJ6z02E9dO1u7ts/OlmvOWNLdZbtoXW+c6/qcVE1Qu6pomQmHupHGejgM7SsVf/Mr4iqPf51/RT8dreCy2yAKKCfD/DwIDAQAB",
  "bearer-only": true,
};
