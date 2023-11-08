#!/bin/bash
echo "pulling newest commit"
git pull
cd backend
echo "starting backend"
npm start