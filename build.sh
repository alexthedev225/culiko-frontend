#!/bin/bash
chmod +x build.sh
pnpm prisma generate
pnpm next build
