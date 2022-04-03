FROM node

WORKDIR /code/
COPY . .

EXPOSE 4200
EXPOSE 8080


RUN npm install