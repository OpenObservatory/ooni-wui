# OONI Web UI assets

These assets are being developed for the purpose of having the web UI for
ooniprobe and some aspects of the mobile version (mainly the rendering of
measurement results).

## Development instructions for OONI web UI

The OONI web UI is based on the following main components:

* [klein](https://klein.readthedocs.org/) for the backend API routing
* [angular.js](https://angularjs.org/) as the frontend web framework
* [webpack](https://webpack.github.io/) for building and dependency management
* [gulp](http://gulpjs.com/) Gulp for build automation tasks.
* [bootstrap](http://getbootstrap.com/) to make styling less painful
* [custom icons](/thetorproject/ooni-wui#custom-icons) for all apps and design

## Setting up a development environment

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

## Code architecture

The web UI is highly modular and is based around the concept of angular
components.
The reason for doing this is that these components can then be re-used across
the various web based graphical interfaces that need to work with OONI data,
such as ooni-explorer, net-probe, ooni-web, etc.

The boilerplate code for a component can be found inside of
`data/component-template/`.

It consists of the following items:

* xxx.component.js this is the actual [angular
  component](https://docs.angularjs.org/guide/component) that includes
  a template, a controller and a stylesheet

* xxx.controller.js this is the [angular
  controller](https://docs.angularjs.org/guide/controller) for the component in
  question. Put in here all the logic necessary for creating variables that are
  to be inside of the scope of the template and registering functions that can
  be called from inside the template.
  Do not use this for manipulating DOM, sharing code across components.

* xxx.css this is the style-sheet for the component in question (XXX in the
  future we may want to use some other templating language such as less, sass
  or whatever people use these days to make our life easier)

* xxx.html this is the HTML template for the component. Refer to the
  [angular.js documentation on
  templates](https://docs.angularjs.org/guide/templates) to learn more about
  what you can do with it.

* xxx.js this is the glue that brings all of the above together. In particular
  what we do inside of here is setting up the URL routes for the particular
  component and setting the component name.
  This is the actual entry point for the component.

## Tips for developing

In order to build the web UI you should run the following command:

```
gulp build
```

To build the mobile version of the web app do:

```
gulp build --mobile
```

To build the mobile version of the web app with test fixtures do:

```
gulp build --mobile --fixtures
```

To enable watching do:

```
gulp build --mobile --fixtures --watch
```

This will generate the bundled web application inside of `dist/build`.

The file `dist/build/mobile.html` is the mobile version, while
`dist/build/index.html` is the index for ooniprobe.

## Custom Icons

The suite of OONI applications use icons created & maintained by [Open Source
Design](http://opensourcedesign.net). Currently, the OONI related icons are
located in this [icons repository](https://github.com/opensourcedesign/icons) :

- [network-censorship](https://github.com/opensourcedesign/icons/tree/master/network-censorship)
- [network-interference](https://github.com/opensourcedesign/icons/tree/master/network-interference)
- [networks-and-protocols](https://github.com/opensourcedesign/icons/tree/master/networks-and-protocols)
