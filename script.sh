npx turbo prune api --docker
cd out/full 
yarn install
yarn turbo build --filter=api...
node apps/api/dist/index.js