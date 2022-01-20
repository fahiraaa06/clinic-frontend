FROM node:lts-alpine3.12 as build-stage
RUN apk update && apk upgrade
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm && npm install
COPY ./ .
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]