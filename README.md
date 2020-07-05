## Usage

### To start

```sh
npm install
```

### Absolute path setup

Create new file at root level with .env name. And add following line in that.

```
 NODE_PATH=src/
```

## Includes

- [React CRA][cra]
- [axios][axios]
- [redux][redux]
- [react-router][react-router]
- [redux-thunk][redux-thunk]
- [node-sass][node-sass]
- [react-bootstrap][react-bootstrap]
- [react-image-crop][react-image-crop]

## Description

- For image upload Cloudinary cloud storage is used.
- Unfortunately bulk image upload and fetch images api not working directly at client side and for that need to write api at server side to work as per documentation of cloudinary. Still upload image apis working fine at client side.
- Redux is used with redux-thunk.
- Async data fetching with axios
- Styling with scss modules
