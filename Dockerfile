# Stage 1: Build the Next.js app
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Run Prisma generate
RUN npx prisma generate
# Build the Next.js application
RUN npm run build

# # Stage 2: Serve the app using Nginx
# FROM nginx:alpine

# # Copy the built Next.js app from the previous stage
# COPY --from=build /app/.next /usr/share/nginx/html

# # Copy the Nginx configuration file
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# # Expose port 80 for Nginx
EXPOSE 3000

# Start Nginx
CMD ["npm", "start"]
