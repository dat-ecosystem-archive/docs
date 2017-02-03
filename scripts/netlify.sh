#!/usr/bin/env bash

echo "Setting Git Stuff"
git config --global user.email "robot@overlord.industries"
git config --global user.name "Netlify"
git remote rm origin
git remote add origin https://joehand:${GH_TOKEN}@github.com/datproject/docs.git

echo "Running npm netlify"
npm run netlify