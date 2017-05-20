const Auth0Lock = require('auth0-lock')

const {
  tokens
} = require('./auth0')

module.exports = class Lock {
  constructor({
    clientId,
    domain
  }) {
    this.lock = new Auth0Lock(clientId, domain)
  }

  load() {
    this.tokens = tokens
  }

  logout() {
    console.log("Logging out!");
    this.tokens = {
      auth0Token: null,
      graphcoolToken: null,
    }
    localStorage.removeItem(AUTH0_TOKEN_STORAGE_KEY)
    localStorage.removeItem(GRAPHCOOL_TOKEN_STORAGE_KEY)
  }

  showLogin() {
    this.lock.show()
  }

  config() {
    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // TODO: improve error handling
          console.log("Error fetching profile: ", error);
        }
        this.onAuth0Login({
          auth0Token: authResult.idToken,
          name: profile.name
        })
      })
    })
  }

  onAuth0Login({
    auth0Token,
    name
  }) {
    console.log('logged in', {
      token,
      name
    })

    localStorage.setItem(AUTH0_TOKEN_STORAGE_KEY, auth0Token)
    // once authenticated, signin to graphcool
    this.signinGraphcool(auth0Token, name)
  }
  async signinGraphcool(auth0Token, name) {
    console.log("Signing into Graphcool");
    // create user if necessary
    try {
      await this.createUser({
        variables: {
          authToken: auth0Token,
          name: name
        }
      })
    } catch (e) {
      if (!e.graphQLErrors ||
        e.graphQLErrors[0].code !== USER_ALREADY_EXISTS_ERROR_CODE
      ) {
        throw e
      }
    }

    // sign in user
    const signinResult = await this.signinUser({
      variables: {
        authToken: auth0Token
      }
    })

    const signinToken = signinResult.data.signinUser.token

    // set graphcool token in localstorage
    localStorage.setItem(GRAPHCOOL_TOKEN_STORAGE_KEY, signinToken)
  }
}