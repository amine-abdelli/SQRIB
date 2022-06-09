To create a custome package:
Create folder
yarn init--
Fill every steps
yarn install
yarn add typescript
initialize tsconfig with:
npx tsc -init
Add "@aqac/utils": "^1.0.0" to client and server package.json
Add "include": ["node_modules/@aqac/utils"], 
refaire un yarn
puis yarn build

Inchallah ca marche à partir de la ;)


package.json
{
  "name": "@aqac/utils",
  "version": "1.0.0",
  "description": "Collection of generic tools",
  "main": "index.ts",
  "author": "Amine Abdelli",
  "license": "MIT",
  "scripts": {
    "lint": "eslint **/**.ts",
    "build": "tsc",
    "test": "jest"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^4.17.0",
    "@typescript-eslint/parser": "^4.17.0",
    "eslint": "^7.21.0",
    "typescript": "^4.1.3"
  },
  "dependencies": {
    "babel-preset-es2015": "^6.24.1",
    "jest": "26.6.0",
    "typescript": "^4.5.2"
  }
}


tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "outDir": "dist",
  },
  "lib": ["es2020"],
  "exclude": [
      "node_modules",
      "../../node_modules",
      "**/**.test.ts",
      "**/**.config.js",
  ]
}