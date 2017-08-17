# Foundation for Application Auth with Auth0

Import `app-auth` module and use `AppAuth` class with `createLock`.

## Usage

TODO

## Setup

[Feathers generator](https://github.com/feathersjs/generator-feathers) now has an option for [Auth0](auth0.com/) using [OAuth](https://oauth.net/). If you follow the [Basic OAuth Guide](https://docs.feathersjs.com/guides/auth/recipe.oauth-basic.html), replacing `GitHub` with `Auth0`, you should be able to get it to work.

### Create Feathers app via CLI

```bash
npm install -g feathers-cli@latest
feathers generate app
```

### Add authentication

Run the `authentication` generator

```bash
feathers generate authentication
```

Select `Auth0` as authentication provider

```bash
? What authentication providers do you want to use? Other PassportJS strategies not in this list can still be configured manually. Auth0
```

Select additional config options

```bash
? What is the name of the user (entity) service? users
? What kind of service is it? NeDB
? What is the database connection string? nedb://../data
    force config/default.json
   create src/authentication.js
    force src/app.js
   create src/services/users/users.service.js
    force src/services/index.js
   create src/models/users.model.js
   create src/services/users/users.hooks.js
   create src/services/users/users.filters.js
   create test/services/users.test.js
   ...
```

## Example

Used by `feather-app` demo

## License

MIT
