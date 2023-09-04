
# MyProducts Application

## Overview

MyProducts is a microservices-based application that includes an API Gateway, an Authentication Service, a Product Service, Jokes Generation and MongoDB as the database. This README provides instructions on how to set up and run the application using Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone git@github.com:VitornscSilva/myproducts.git
   cd MyProducts
   ```

2. Build and start the application using Docker Compose:

   ```bash
   docker-compose up -d
   ```

   This command will build container images for your services (API Gateway, Authentication Service, Product Service) and start them in detached mode.

## Running Services Individually for Development

During development, you can run each service individually by following these steps:

### API Gateway

1. Navigate to the `api-gateway` directory:

   ```bash
   cd api-gateway
   ```

2. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies and start the development server:

   ```bash
   yarn install
   yarn dev
   ```

4. The API Gateway service will be available at the specified port for development.

### Authentication Service

1. Navigate to the `apps/auth` directory:

   ```bash
   cd apps/auth
   ```

2. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies and start the development server:

   ```bash
   yarn install
   yarn dev
   ```

4. The Authentication Service will be available at the specified port for development.

### Product Service

1. Navigate to the `apps/products` directory:

   ```bash
   cd apps/products
   ```

2. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

3. Install dependencies and start the development server:

   ```bash
   yarn install
   yarn dev
   ```

4. The Product Service will be available at the specified port for development.


## Access the services:

   - API Gateway: [http://localhost:3333](http://localhost:3333)
   - Authentication Service: [http://localhost:3334](http://localhost:3334)
   - Product Service: [http://localhost:3332](http://localhost:3332)
   - MongoDB: [mongodb://docker:docker@localhost:27017](mongodb://docker:docker@localhost:27017)


## Stopping the Application

To stop the application and remove the containers, run:

```bash
docker-compose down
```

## Configuration

- MongoDB URL can be configured in the `.env` file.
- JWT secrets for the API Gateway and Authentication Service are configured in the `.env` file.


## License

This project is licensed under the [MIT License](LICENSE).
