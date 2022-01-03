# QRCodeJenga

## Library

- Stack
  - TypeScript
  - React
  - webpack
- Component Library
  - [Chakra UI](https://chakra-ui.com/)
- Icon Library
  - [React Icons](https://react-icons.github.io/react-icons/)
- QRCode generator
  - [soldair/node\-qrcode: qr code generator](https://github.com/soldair/node-qrcode)

## Install

```bash
# Use node.js that is specified by .nvmrc (or install node.js manually)
nvm use
# Install dependency
npm ci
```

## Build

```
npm run build
```

## Deploy to gh-pages

```bash
git fetch origin
git checkout main
npm run build
git commit -m 'build'
git branch -D published
git checkout --track origin/published
git merge main
git push main published
```
