FROM node:13-alpine

ARG APP_HOME="/opt/api"

ADD . $APP_HOME/

WORKDIR $APP_HOME

USER root

RUN yarn install && \
    chown -R ${APP_USER}:root $APP_HOME /var/cache/nginx /etc/nginx && \
    chmod -R ug+rwx $APP_HOME /var/cache/nginx /etc/nginx

USER ${APP_USER}

EXPOSE 3000

CMD ["yarn", "start"]








