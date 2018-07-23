# get image from docker hub
FROM node:8.11.1

# add author
MAINTAINER Chris Tarasovs <chris@frontr.co.uk>

# copy project files to image
COPY . /app

# specify working directory
WORKDIR /app

# install angular-cli globally
RUN npm install @angular/cli@1.7.4 --unsafe

# run npm install and download dependecies
RUN npm install -g gulp
RUN npm i gulp
npm uninstall -g webpack npm install --save-dev html-webpack-plugin webpack webpack-dev-server
RUN yarn config set registry https://registry.npmjs.org
RUN yarn

#RENAME ./src/server/server.ts ./src/server/bc-server.txt
#RENAME ./src/server/live-server.txt ./src/server/server.ts
#RENAME ./tools/build/build-config.json ./tools/build/bc-build-config.json
#RENAME ./tools/build/build-config-live.json ./tools/build/build-config.json

# RUN npm run clean
# RUN npm install

# RUN npm run clean
RUN npm run build:universal-prod

# COPY package.json /app/dist/

#RUN npm install --only=production

# Expose port for the container
EXPOSE 6226

# specify working directory
WORKDIR /app

# Start server
CMD [ "node", "./public/.server/server.js" ]

