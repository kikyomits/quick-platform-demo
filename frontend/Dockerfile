FROM nginx:alpine

USER root

ARG APP_HOME="/usr/share/nginx/html/"

ADD . $APP_HOME/

WORKDIR $APP_HOME

# Configure Permissions
RUN chown -R ${APP_USER}:root $APP_HOME /var/cache/nginx /etc/nginx && \
    chmod -R ug+rwx $APP_HOME /var/cache/nginx /etc/nginx

USER ${APP_USER}

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]