# [multi-stage build] node, yarn runtime
FROM node:12.2.0-slim

ARG APP_HOME=/app

# set working directory
WORKDIR $APP_HOME

EXPOSE 3000

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN set -eux; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    curl \
    ; \
  groupadd kbpp && \
  useradd -r -m -s /bin/bash -g kbpp kbpp && \
  mkdir -p $APP_HOME &&\
  chown -R kbpp:kbpp $APP_HOME/

WORKDIR /tmp
COPY --chown=kbpp:kbpp ./ $APP_HOME/
WORKDIR $APP_HOME

# install app dependencies
COPY ./package.json $APP_HOME/
COPY ./yarn.lock $APP_HOME/

ENV NODE_ENV=production

# RUN npm install --silent
# RUN npm install typescript@3.7.2 react-scripts@3.4.3 -g --silent

USER kbpp

# start app

# CMD yarn dev
# CMD ["serve", "-p", "3000", "-s", "."]
