FROM node:11.1.0
ENV NODE_ENV production
#ENV DEBUG "postgraphile:postgres*"
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install -g typescript
COPY . .
RUN npm run build
CMD node build/index.js
#CMD [ "node ","/app/build/index.js" ]