FROM node:16.16.0-alpine as build

#ARG ENVIRONMENT
#ARG TEST_URL
#ARG DOMAIN

WORKDIR /usr/local/app

COPY ./ /usr/local/app
#RUN apk add sed
#RUN sed -i "s/<TEST_URL>/${TEST_URL}/g" /usr/local/app/src/environments/environment.e2e.ts
#RUN cat /usr/local/app/src/environments/environment.e2e.ts

RUN npm install
RUN npm run build

## stage 2
FROM nginxinc/nginx-unprivileged:latest

USER nginx

COPY --from=build /usr/local/app/dist/front-end /usr/share/nginx/html
