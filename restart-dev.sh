#!/bin/bash
echo "Killing any running Next.js processes..."
pkill -f "next dev" || true

echo "Clearing Next.js cache..."
rm -rf .next

echo "Starting development server..."
npm run dev
