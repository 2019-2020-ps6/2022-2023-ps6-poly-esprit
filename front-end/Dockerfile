FROM node:16.16.0-alpine as build
ARG ENVIRONMENT
ARG TESTURL
ARG PROXYURL
ARG DOMAIN
# Set the working directory
WORKDIR /usr/local/app
# Add the source code to app
COPY ./ /usr/local/app/
RUN apk add sed
RUN sed -i "s/<TESTURL>/${TESTURL}/g" /usr/local/app/src/environments/environment.e2e.ts
RUN cat /usr/local/app/src/environments/environment.e2e.ts
RUN sed -i "s/<PROXYURL>/${PROXYURL}/g" /usr/local/app/src/environments/environment.proxy.ts
RUN cat /usr/local/app/src/environments/environment.proxy.ts
COPY ./default.conf /usr/local/app/default.conf
RUN sed -i "s/<DOMAIN>/${DOMAIN:-localhost}/g" /usr/local/app/default.conf
RUN cat /usr/local/app/default.conf
# Install all the dependencies
RUN npm install
# Generate the build of the application
RUN npm run build:$ENVIRONMENT
# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginxinc/nginx-unprivileged:latest
USER nginx
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/front-end/ /usr/share/nginx/html
COPY --from=build /usr/local/app/default.conf /etc/nginx/conf.d/default.conf
