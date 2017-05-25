# jQuery GraphCool Auth0 app

Demo app demonstrating GraphCool and Auth0 integration in a simple [jQuery](https://jquery.com/) Web app

## Pre-requisites

On [Auth0 university](https://auth0.com/university/) watch:

- [Auth0 101 course](https://auth0.com/university/2/auth0-101)
- [Getting Started with the lock](https://auth0.com/university/3/getting-started-with-the-lock)

On [GraphCool youtube channel](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w), watch the first 2 minutes of GraphCool  [User Authentication with Auth0 for React and Apollo](https://www.youtube.com/watch?v=5uxq8Om-AZQ) which demonstrates how to create an Auth0 client app and configure a GraphCool app for Auth0 integration.

Now you should be good to go!

## Development

Install webpack-dev-server

`$ npm i -g webpack-dev-server`

Start dev server

`$ npm run dev`

Watch files, compile and trigger reload of dev server

`$ npm run watch`

## Build

Project needs to be compiled using Babel`

`$ npm run build`

## Run file server

Start a [local HTTP file server](https://www.npmjs.com/package/local-web-server)

Install HTTP file server globally

`$ npm i local-web-server -g`

Start it

```bash
$ npm run start
serving at http://localhost:8000
```

Open a browser at `localhost:8000`

`$ open http://localhost:8000`

Time to play!

## Troubleshooting

Currently getting:

```bash
TypeError: Super expression must either be null or a function, not undefined
```

Have tried with `babel-polyfill` which can be added either in html `<script>` element
or as first statement in included code `import 'babel-polyfill'`

```html
  <script src="node_modules/babel-polyfill/dist/polyfill.js"></script>
```

Might be due to `async` statements or other ES6/ES7 syntax not being transpiled correctly!

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup