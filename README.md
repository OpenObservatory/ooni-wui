# OONI Web UI assets

These assets are being developed for the purpose of having the web UI for
ooniprobe and some aspects of the mobile version (mainly the rendering of
measurement results).

## Development instructions for OONI web UI

The OONI web UI is based on the following main components:

* [klein](https://klein.readthedocs.org/) for the backend API routing
* [react.js](https://facebook.github.io/react/) for the rendering of components
* [webpack](https://webpack.github.io/) for building and dependency management
* [bootstrap](http://getbootstrap.com/) to make styling less painful
* [custom icons](https://github.com/thetorproject/ooni-wui#custom-icons) for all apps and design

## Usage

You are expected to already have a working python development environment that
allows you to develop ooni-probe.

In here are listed only the extra steps that are specific to the web UI.

The dependencies of the web UI are all managed via `npm` and they can be
installed with:

```
npm install
```

This requires that you have a recent version of
[node](https://nodejs.org/en/download/).

Then to start the development server do:

```
npm start
```

## Custom Icons

The suite of OONI applications use icons created & maintained by [Open Source
Design](http://opensourcedesign.net). Currently, the OONI related icons are
located in this [icons repository](https://github.com/opensourcedesign/icons) :

- [network-censorship](https://github.com/opensourcedesign/icons/tree/master/network-censorship)
- [network-interference](https://github.com/opensourcedesign/icons/tree/master/network-interference)
- [networks-and-protocols](https://github.com/opensourcedesign/icons/tree/master/networks-and-protocols)
