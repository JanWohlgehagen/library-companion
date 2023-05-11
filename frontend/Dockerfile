FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
CMD cd .\frontend\
RUN ng build --configuration=production


CMD node ./frontend/server.js
