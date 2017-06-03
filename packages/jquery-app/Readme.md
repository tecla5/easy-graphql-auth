# jQuery GraphCool Auth0 app

Demo app demonstrating GraphCool and Auth0 integration in a simple [jQuery](https://jquery.com/) Web app

## Pre-requisites

On [Auth0 university](https://auth0.com/university/) watch:

- [Auth0 101 course](https://auth0.com/university/2/auth0-101)
- [Getting Started with the lock](https://auth0.com/university/3/getting-started-with-the-lock)

On [GraphCool youtube channel](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w), watch the first 2 minutes of GraphCool  [User Authentication with Auth0 for React and Apollo](https://www.youtube.com/watch?v=5uxq8Om-AZQ) which demonstrates how to create an Auth0 client app and configure a GraphCool app for Auth0 integration.

Now you should be good to go!

## Development

Enausre you are loading [babel-polyfill](https://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined-with-async-await) in order for async/await to work.

See `webpack/webpack.app.js` configuration:

```js
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../src/app.js')
  ],
```

Install `webpack-dev-server`

`$ npm i -g webpack-dev-server`

Watch files, compile and trigger reload of dev server

`$ npm run watch`

## Build

Project needs to be compiled using Babel

`$ npm run build`

## Start server

Ensure you have built a `dist/app.js` which is used by the HTML file.

Start development server: `$ npm run dev`

## Alternative: Run file server

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

`Super expression must either be null or a function, not undefined`

If all else fails try adding `babel-polyfill` directly in html `<script>` element
or as first statement in included code `import 'babel-polyfill'`

```html
  <script src="node_modules/babel-polyfill/dist/polyfill.js"></script>
```

ES7 `await/async` statements and some other ES6/ES7 syntax still needs to be "handled" with extra super magic enchantments!!

Let us know if you find/have better solutions ;)

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup