# Start with the node:latest image
FROM node:latest
# add the source code of the application to the image

WORKDIR /app
# copies the content of the packge.json file
COPY package.json ./
# install all the dependencies
RUN npm install
# copies all the files in local directory to the /app directory created in the image.
COPY . .
# starts up the application after every single step has been navigated successfully.
CMD ["npm", "start"]
