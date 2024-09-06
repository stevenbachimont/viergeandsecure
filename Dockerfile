# syntax=docker/dockerfile:1.4
FROM node:20-alpine

# Install required packages
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

# Enable and prepare pnpm
RUN corepack enable && \
    corepack prepare --activate pnpm@latest && \
    pnpm config -g set store-dir /.pnpm-store

# Copy package.json files
COPY --link ./server/package.json ./server/
COPY --link ./client/package.json ./client/

# Install dependencies
RUN cd client && \
    pnpm fetch && \
    pnpm install
RUN cd server && \
    pnpm fetch && \
    pnpm install

# Copy application code
COPY ./client ./client
COPY ./server ./server
COPY docker-entry.sh .

# Build the client application
RUN cd client && \
    pnpm run build

# Start the application
CMD ["sh", "./docker-entry.sh"]
