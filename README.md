# :book: WordGame project

## :notebook: Description

WordGame is a project which I've made during my studies on course "Network Protocols". It consists of:

- [**client**](client) (written in [TypeScript](https://www.typescriptlang.org/)),
- [**server**](server) (also written in [TypeScript](https://www.typescriptlang.org/)),
- **Identity provider ([Keycloak](https://www.keycloak.org/))** with **[PostgreSQL](https://www.postgresql.org/)** database,
- [**MongoDB Atlas**](https://www.mongodb.com/atlas/database) **database**,

and it uses **HTTP**, **WebSockets** and **OAuth 2.0** protocols.

---

## :star: Main features

The main features of this app are:

- registering, editing, deleting and logging to (and logging out from) a user account (only logged-in users can access the app)
- browsing list of all valid game words with definitions (based on official English Scrabble&trade; words database)
- live-chat on game page
- playing game with other player

---

## :video_game: Game rules

1. The game begins when one player (host) creates game.
2. Then server generates a list of random 10 letters from English alphabet and finds 10 random words which consists only of (some or all) letters drawn before (the server searches for words in a database of valid English Scrabble&trade; words)
3. Host of the game has to provide a link to it for the other player (opponent). When the opponent joins, the game starts.
4. The player's aim is to arrange possible letters to a word that might be one of the chosen ones. If he guesses right, he gets the amount of points equal to word's length, otherwise the turns change.
5. The winner is the player with the most points after all words are gussed.

---

## :chart_with_upwards_trend: Future improvements

In the future I'm planning to rewrite server from TypeScript to some other language (probably [Go](https://go.dev/) which I'm currently learning).

---

## :computer: Running app

This app uses [**Docker**](https://www.docker.com/) (and [**Docker Compose**](https://docs.docker.com/compose/)) for both development and production. You can check their versions with following commands:

```
$ docker version
$ docker compose version
```

In order to run this app for development, first you have to create `.env` file inside `server` directory according to `.env.example` pattern - it includes credentials for Atlas database and Keycloak's URL and public key of used realm.

When it's done, you have to start Docker and run following command:

```
$ docker compose -p <project_name> up
```

It will create project named `project_name` and start all 4 parts of this app inside separate Docker containers. Apps will automatically refresh upon source files updates. Data created by Keycloak will be stored inside PostgreSQL database and it will be mounted to `postgres` directory.

The app is also configured for running in Kubernetes. For more information check [`kubernetes`](./kubernetes/) directory.

---
