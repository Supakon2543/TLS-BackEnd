FROM node:18-bullseye-slim

ENV NODE_APP_ENV=prod
ENV NPM_CONFIG_LOGLEVEL info
ENV TZ Asia/Bangkok

RUN apk add --no-cache tzdata chromium \
  && cp /usr/share/zoneinfo/Asia/Bangkok /etc/localtime \
  && echo "Asia/Bangkok" >  /etc/timezone \
  && rm -rf /var/cache/apk/*

RUN apk --update --no-cache add curl

# Expose the API Port
EXPOSE 9132

# Working Dir
WORKDIR /src/app
COPY . /src/app

# Install Files
RUN npm install
RUN npm run build

COPY . .

CMD ["npm", "run", "start:prod"]