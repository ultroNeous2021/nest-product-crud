# Product Management CRUD with NestJS

TThis is a sample project implementing a product management system with a Next.js frontend and a Nest.js backend. The application is designed to store product data with fields such as name, images, price, type, location, and quantity. The data is stored in a PostgreSQL database with a data layer that fetches the necessary information. The product images are stored in a local folder.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- NestJs Installed globally
- PostgreSQL database set up
- pnpm installed globally

## Installation

1. Clone the repository:

   ```bash
   git clone <repo_url>
   ```

2. Install dependencies:

   ```bash
   cd next-nest-product-management
   pnpm install
   ```

### Database Configuration

Create the database in the pgAdmin. And save the db connection.

### Configuration

1. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your PostgreSQL database credentials.

### Running the Application

```bash
pnpm start
```

### Seed the data

```bash
curl --location 'http://localhost:3000/product-type/seed'
curl --location 'http://localhost:3000/product-location/seed'
```

### Testing

```bash
pnpm test
```

## Project Structure

```
|-- project_root
|-- config/
|   |-- db.config.ts
|-- src/
|   |-- products/
|   |   |-- dto/
|   |   |   |-- product_data.dto.ts
|   |   |   |-- createProduct.dto.ts
|   |   |   |-- createProductType.dto.ts
|   |   |   |-- product_location.dto.ts
|   |   |   |-- product_type.dto.ts
|   |   |   |-- updateProduct.dto.ts
|   |   |-- product_data/
|   |   |   |-- product_data.entity.ts
|   |   |-- product_location/
|   |   |   |-- product_location.entity.ts
|   |   |-- product_type/
|   |   |   |-- product_type.entity.ts
|   |   |   |-- product_type.service.ts
|   |   |   |-- product_type.controller.ts
|   |   |   |-- product.entity.ts
|   |   |-- product.controller.spec.ts
|   |   |-- product.controller.ts
|   |   |-- product.service.ts
|   |   |-- product.module.ts
|   |-- utils/
|   |   |-- helper.ts
|   |-- app.controller.spec.ts
|   |-- app.controller.ts
|   |-- app.module.ts
|   |-- app.service.ts
|   |-- main.ts
|-- test/
|   |-- jest-e2e.json
|-- uploads/
|-- .env
|-- nest-cli.json
|-- test-image.jpg
|-- tsconfig.json
|-- package.json
|-- pnpm-lock.yaml
|-- README.md
```

## Technologies Used

- NestJS
- PostgreSQL
- TypeORM
- Jest
