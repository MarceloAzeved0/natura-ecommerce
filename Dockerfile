# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start:prod"]