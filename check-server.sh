#!/bin/bash
echo "Waiting for server to start..."
sleep 5
echo "Checking server on port 3003..."
curl -s http://localhost:3003 | grep -E "(Postpartum|title|stylesheet)" | head -10
echo ""
echo "Checking CSS files..."
curl -s http://localhost:3003 | grep -o 'href="[^"]*"' | grep css
echo ""
echo "Server is running at: http://localhost:3003"