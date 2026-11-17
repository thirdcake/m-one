#!/bin/bash
esbuild src/main.ts --bundle --outfile=public/dist/main.js --target=esnext
