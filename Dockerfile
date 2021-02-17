# [multi-stage build] node, yarn runtime
FROM node:12.2.0-slim

ARG APP_HOME=/opt/frontend

# set working directory
WORKDIR /opt/frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /opt/frontend/node_modules/.bin:$PATH

# install app dependencies
COPY ./package.json $APP_HOME/
COPY ./yarn.lock $APP_HOME/
RUN yarn

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
USER kbpp

# start app
CMD yarn dev