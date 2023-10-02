#!/bin/bash
cd frontend
echo "installing frontend"
npm install
echo "building frontend"
npm run build
echo "copying frontend to backend"
cp build ../backend -r
cd ../backend
echo "installing backend"
npm install