# develop stage
FROM node:lts as develop-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm cache clean -f \
    && npm run build

# production stage
FROM nginx:1.15.7-alpine as production-stage
COPY default.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/dist/ /usr/share/nginx/html/

# To Heroku you can't expose a port
# EXPOSE 80
# To Heroku you need set port from env $PORT

RUN apk add jo --update-cache --repository http://dl-cdn.alpinelinux.org/alpine/v3.12/community/ --allow-untrusted
COPY entrypoint.sh .
CMD ["sh","-c", "./entrypoint.sh && sed -i -e 's/$PORT/'$PORT'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
# CMD [sed -i -e 's/$PORT/'$PORT'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;']
