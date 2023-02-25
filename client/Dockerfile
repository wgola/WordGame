FROM node:18.14-alpine3.17 as builder
COPY . .
RUN yarn install
RUN yarn build

FROM nginx
COPY --from=builder dist/ /usr/share/nginx/html