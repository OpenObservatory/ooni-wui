# OONI Web UI assets

These assets are being developed for the purpose of having the web UI for
ooniprobe and some aspects of the mobile version (mainly the rendering of
measurement results).

This UI is also used to present the results inside of the mobile UI.

## Development instructions for OONI web UI

The OONI web UI is based on the following main components:

* [react.js](https://facebook.github.io/react/) for the rendering of components
* [webpack](https://webpack.github.io/) for building and dependency management
* [bootstrap](http://getbootstrap.com/) to make styling less painful
* [custom icons](https://github.com/thetorproject/ooni-wui#custom-icons) for all apps and design

## Setup

The dependencies of the web UI are all managed via `npm` and they can be
installed with:

```
npm install
```

This requires that you have a recent version of
[node](https://nodejs.org/en/download/).

## Usage

To improve your development experience better it's recommended that you also
install the following browser add-ons:

* [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/)
* [Redux dev tools](https://github.com/zalmoxisus/redux-devtools-extension)

### Development server

When developing the web UI you generally use the mocked API endpoints and
have live reloading support.

To start the development server do:

```
npm run start
```

You can now use the development server on `http://localhost:3000`.

### Building Web UI

To build the Web UI to be used by ooniprobe on desktop you should run:

```
npm run deploy:prod
```

You will then find the built client inside of the `dist/` directory.

### Building mobile UI

To build the mobile assets for the web UI you should run:

```
npm run compile:mobile
```

The mobile assets will end up inside of the `dist/` directory.

### Testing

To run the end to end tests you should run:

```
npm run test
```

## Custom Icons

The suite of OONI applications use icons created & maintained by [Open Source
Design](http://opensourcedesign.net). Currently, the OONI related icons are
located in this [icons repository](https://github.com/opensourcedesign/icons) :

- [network-censorship](https://github.com/opensourcedesign/icons/tree/master/network-censorship)
- [network-interference](https://github.com/opensourcedesign/icons/tree/master/network-interference)
- [networks-and-protocols](https://github.com/opensourcedesign/icons/tree/master/networks-and-protocols)
