module.exports = function (localStorageConfig = {}) {
  return {
    auth0Token: localStorage.getItem(localStorageConfig.auth0Token),
    graphcoolToken: localStorage.getItem(localStorageConfig.graphcoolToken),
  }
}