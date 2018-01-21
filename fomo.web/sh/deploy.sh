#!/bin/bash

echo '\n✌️  Ensure yarn is up-to-date\n'
yarn install || { echo '\n😥  Yarn install failed'; exit 1; }


echo '\n✊  Build Next.js\n'
yarn build:next || { echo '\n😥  Build failed'; exit 1; }


echo '\n👉  Deploy to "now"\n'
now || { echo '\n😥  Deploy failed'; exit 1; }


echo '\n✨✨  Deployment complete.\n'
