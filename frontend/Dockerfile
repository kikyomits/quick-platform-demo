FROM nginx:alpine

USER root

ARG APP_HOME="/usr/share/nginx/html/"

ADD . $APP_HOME/

WORKDIR $APP_HOME

# Configure Permissions
RUN \
    rm -f /etc/nginx/conf.d/default.conf && \
    mv default.conf /etc/nginx/conf.d/ && \
    apk add curl && \
    chown -R ${APP_USER}:root $APP_HOME /var/cache/nginx /etc/nginx /var/run && \
    chmod -R ug+rwx $APP_HOME /var/cache/nginx /etc/nginx /var/run 

USER ${APP_USER}

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]