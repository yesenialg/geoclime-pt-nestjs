FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g @nestjs/cli nodemon
EXPOSE 3000

