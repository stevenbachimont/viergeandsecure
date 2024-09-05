#!/bin/sh

echo '----- Validating Branch Name...'
npx validate-branch-name

echo '----- Running Lint...'
npm run lint

echo '----- Validation Complete!'
