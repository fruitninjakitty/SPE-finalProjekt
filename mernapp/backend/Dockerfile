# This line specifies the base image to use for the Docker image. 
# In this case, it is using the official Node.js image with the version 16.19.1-alpine,
#  which is a lightweight version of the image that uses Alpine Linux as the base operating system.
FROM node:16.19.1-alpine

# This line sets the working directory for the rest of the commands in the Dockerfile to /usr/src/app.
WORKDIR /usr/src/app

# This line copies the package.json and package-lock.json files from the local directory to the Docker image.
COPY package*.json ./

# This line runs the npm install command in the Docker image to install the dependencies listed in the package.json file.
RUN npm install

RUN mkdir logs && chown -R node:node logs

# This line installs the cors package, which is a middleware for enabling Cross-Origin Resource Sharing (CORS) in the Node.js application.
RUN npm install cors

# This line copies all the files in the local directory to the Docker image.
COPY . .

EXPOSE 5000

# This line specifies the command to run when the Docker container is started.
#  In this case, it is running the npm start command to start the Node.js application.
CMD ["npm", "start"]