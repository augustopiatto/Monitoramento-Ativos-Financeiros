#!/bin/sh
cd front
npm ci
npm run build
npm run dev -- --port 5173
