FROM node:18.12.1 AS build

WORKDIR /app
COPY package.json .
RUN npm install
COPY nginx.conf .
COPY . /app

RUN npm run build

FROM nginx
COPY --from=build /app/build usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

#docker build -f Dockerfile -t kafka-frontend .
#docker run -d -p 3000:80 --name idtolu-cloud-frontend idtolu-cloud-frontend