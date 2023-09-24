FROM node:8

WORKDIR /app
COPY ["package.json" , "package-lock.json*" , "./"]
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8000
EXPOSE 9000
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh 
CMD ["/entrypoint.sh"]