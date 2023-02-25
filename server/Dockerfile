FROM node:18.14-alpine3.17 as builder
COPY . .
RUN yarn install
RUN yarn build

FROM node:18.14-alpine3.17
WORKDIR /app
COPY --from=builder package.json yarn.lock /app/
COPY --from=builder dist/ /app/dist/
RUN yarn install --production=true
ENTRYPOINT [ "yarn", "start" ]

