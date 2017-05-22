import gql from 'graphql-tag';

const createUser = gql `
  mutation createUser($authToken: String!, $name: String){
    createUser(
      authProvider: {
        auth0: {
          idToken: $authToken,
        }
      },
      name: $name
    ) {
      id,
      auth0UserId
    }
  }
`

const signinUser = gql `
  mutation signinUser($authToken: String!){
    signinUser(
      auth0: {
        idToken: $authToken
      }
    ) {
      token
      user {
        id,
        auth0UserId
      }
    }
  }
`

export default {
  createUser,
  signinUser
}