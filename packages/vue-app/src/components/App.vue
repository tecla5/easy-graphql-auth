<template>
  <div id="app">
    <div class="banner">
      <img src="https://vuejs.org/images/logo.png"
           width="100"
           alt="vue"
           class="logo" />
      <h1>Welcome {{ profile.name }} to Vue.js</h1>
      <div id="session">
        <button id="login"
                @click="doLogin">Login</button>
        <button id="logout"
                class="hide"
                @click="doLogout">Logout</button>
      </div>
      <div class="status">{{ isLoggedIn }}</div>
    </div>
    <div class="bottom">
      <p>
        To get started, edit <code>./src/components/App.vue</code> and save to reload.
        <br/>
        <span :class="$style.fade">
                                        Checkout <code>./README.md</code> for more usages.
                                      </span>
      </p>
    </div>
  </div>
</template>

<script>
import lock from '../auth0/lock'

export default {
  name: 'app',
  data: function () {
    // TODO: display in template
    return {
      isLoggedIn: false,
      profile: {}
    }
  },
  methods: {
    doLogin: () => {
      lock
        .showLock()
        .subscribeAuthenticated()
    },
    doLogout: () => {
      lock
        .logout()
    },
    loggedIn: ({ profile }) => {
      component.isLoggedIn = true;
      component.profile = profile;
      // hide login button
    },
    loggedOut: () => {
      component.isLoggedIn = false;
      component.profile = {};
      // hide logout button
    }
  },
  created: function () {
    lock.on('signedIn', this.loggedIn)
    lock.on('loggedOut', this.loggedOut)
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

body {
  margin: 0;
  font: 14px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

code {
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 0.9em;
  white-space: pre-wrap;
  color: #2c3e50;
}

code::before,
code::after {
  content: '`';
}
</style>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
}

#app h1 {
  color: #2c3e50;
  font-weight: 300;
}

.banner {
  height: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.bottom {
  height: 50%;
  background-color: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 24px;
  font-weight: 300;
}

.logo {
  animation: spin 4s 1s infinite linear
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<style module>
.fade {
  font-size: 14px;
}
</style>
