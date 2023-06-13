FROM node:18.14-alpine3.17 as builder

ARG VITE_KEYCLOAK_URL
ENV VITE_KEYCLOAK_URL $VITE_KEYCLOAK_URL
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL $VITE_BACKEND_URL

WORKDIR /app
COPY package.json .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:1.23.3
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /var/www/wordgame/html/