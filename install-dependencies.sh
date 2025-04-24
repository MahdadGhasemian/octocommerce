#!/bin/bash
set -e

echo ""
echo "📦 Installing backend dependencies..."
echo "-------------------------------------"

# Auth
echo "🔧 Installing dependencies for auth..."
cd backend/apps/auth
pnpm install
cd -

# Bot
echo "🔧 Installing dependencies for bot..."
cd backend/apps/bot
pnpm install
cd -

# File
echo "🔧 Installing dependencies for file (skipping Puppeteer download)..."
cd backend/apps/file
PUPPETEER_SKIP_DOWNLOAD=true pnpm install
cd -

# Notification
echo "🔧 Installing dependencies for notification..."
cd backend/apps/notification
pnpm install
cd -

# Storage
echo "🔧 Installing dependencies for storage..."
cd backend/apps/storage
pnpm install
cd -

# Store
echo "🔧 Installing dependencies for store..."
cd backend/apps/store
pnpm install
cd -

# Root backend
echo "🔧 Installing root backend dependencies..."
cd backend
pnpm install
cd -

echo ""
echo "📦 Installing frontend dependencies..."
echo "-------------------------------------"

# Panel
echo "🔧 Installing Panel dependencies..."
cd frontend/panel
pnpm install
cd -

# Website
echo "🔧 Installing Website dependencies..."
cd frontend/website
pnpm install
cd -

echo ""
echo "✅ All dependencies installed successfully!"
