export const config = {
  "confidential-port": 8443,
  realm: "WordGame",
  "auth-server-url": "http://localhost:8080/",
  "ssl-required": "external",
  resource: "WordGameServer",
  realmPublicKey:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1rsYsi1G1c0lWrxQNOYF7qXVghqz4953F4XrzM+kLwOL9j3/Ze/rM0x0HYRFZnINrSojsP4ltczL0sFUAQC0i5Ub2ZtwvlSGD/duZJo77TaMIUfb+Hdv6YohOy0MvLK931EKWbkx9PACr/I9KgtfZILZoHmMuzay67DnMTalAu+yN8Xw+lhiKqEtbUwD3eKq9NEMb65nGqHPfugmKvje09LeyND58iurGdeULjlvE1K1ewpatbLIkTZBBVf6dOdGIMp+vdNB1AIvAk+3vbdjSxtcpDTHdVivcVmGtTO6kc95T4+nzkPYGFAB9PscJm/n5ckgqJNDdYqgSaJOUgUx8wIDAQAB",
  "bearer-only": true,
};
