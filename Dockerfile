# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the image
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application into the image
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD [ "node", "index.js" ]