FROM node:21-bookworm
LABEL authors="flori"

COPY . /app
WORKDIR /app

COPY .docker/entrypoint.sh /docker/entrypoint.sh
RUN chmod +x /docker/entrypoint.sh

RUN npm install

ENTRYPOINT ["/docker/entrypoint.sh"]