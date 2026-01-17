#!/bin/bash

# Kill any existing processes on our ports
echo "Cleaning up existing processes..."
lsof -ti:3001 | xargs -r kill -9 2>/dev/null
lsof -ti:5173 | xargs -r kill -9 2>/dev/null
sleep 1

# Start backend in background
echo "Starting backend on port 3001..."
cd /home/devdad/Olly/customer-chatbot-saas/server
npm run dev &
SERVER_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "Starting frontend on port 5173..."
cd /home/devdad/Olly/customer-chatbot-saas/client
npm run dev &

echo ""
echo "Both servers started!"
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for Ctrl+C
trap "kill $SERVER_PID 2>/dev/null; exit" INT
wait
