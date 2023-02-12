FROM node:14.0.0
WORKDIR /app/frontend
COPY package.json package-lock.json ./
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
RUN npm install 
RUN npm install -g expo-cli
COPY . ./