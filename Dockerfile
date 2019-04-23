FROM nginx:1.15-alpine

WORKDIR /opt/movies/app

COPY ./extras/default.conf /etc/nginx/conf.d/default.conf

ADD build /opt/movies/app/

CMD ["nginx", "-g", "daemon off;"]
