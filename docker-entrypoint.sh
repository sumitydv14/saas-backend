#!/bin/sh

echo "Starting SaaS API..."

echo "Waiting for database..."
sleep 5

echo "Running Prisma generate..."
npx prisma generate

echo "Running Prisma migrate deploy..."
npx prisma migrate deploy

echo "Starting server..."
npm start
