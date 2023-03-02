# :incoming_envelope: RabbitMQ MQTT Broker

## :notebook: Description

These are a simple config for [RabbitMQ](https://www.rabbitmq.com/) MQTT Broker and a Dockerfile needed to run it inside a container alongside [client](client) and [server](server). It allows MQTT connection over WebSocket, which is necessary to enable client (which is a web application) to communicate with Broker.
