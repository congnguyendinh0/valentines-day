name: CI/CD Pipeline for Next.js

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  lint-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18,23]
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Lint Code
        run: npm run lint

      - name: Run Unit Tests
        run: npm test

  build:
    runs-on: ubuntu-latest
    needs: lint-test
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '23'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Next.js App
        run: npm run build

      - name: Audit Dependencies
        run: npm audit --audit-level=moderate

  docker:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Build Docker Image
        run: docker build -t valentines-website .