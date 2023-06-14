FROM

RUN apk add curl

USER node

WORKDIR /home/node

COPY --chown=node:node ./app ./app
COPY --chown=node:node ./database ./database
COPY --chown=node:node ./package* ./

RUN npm install

ENTRYPOINT ["npm", "run", "start"]