#!/bin/bash

echo "Setting Git Stuff"
# Need this for ecosystem-docs
git config --global user.email "robot@overlord.industries"
git config --global user.name "Netlify"

echo "Running npm netlify"
npm run netlify