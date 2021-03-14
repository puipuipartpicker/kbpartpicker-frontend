# TODO modify for all envs (dev, stg, prd) with multi-stage build
# https://mherman.org/blog/dockerizing-a-react-app/
FROM node:12.2.0-slim AS builder

ARG APP_HOME=/app

# set working directory
WORKDIR $APP_HOME

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN set -eux; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    curl \
    ;

# install app dependencies
COPY ./package.json $APP_HOME/
COPY ./yarn.lock $APP_HOME/

RUN yarn

WORKDIR /tmp
COPY ./ $APP_HOME/
WORKDIR $APP_HOME

RUN yarn build
# CMD yarn start
CMD serve -p $PORT -s build

# # NGINX
# FROM nginx:1.17-alpine

# COPY --from=builder /app/build /usr/share/nginx/html
# COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
