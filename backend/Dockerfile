FROM node:13-alpine

ARG APP_HOME="/opt/api"

ADD . $APP_HOME/

WORKDIR $APP_HOME

USER root

RUN yarn install && \
    apk add curl && \
    chown -R ${APP_USER}:root $APP_HOME && \
    chmod -R ug+rwx $APP_HOME

USER ${APP_USER}

EXPOSE 3000

CMD ["yarn", "start"]








