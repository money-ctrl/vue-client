<template>
  <div>
    <h2>login</h2>
    <button @click="login">Log in with googe</button>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  data() {
    return {
      token: null,
      user: null,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.$store.dispatch('user/openDBChannel').then(() => {
          this.$router.push('/app')
        }).catch(console.error)
      } else {
        this.$router.push('/')
      }
    })
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.token = result.credential.accessToken
        this.user = result.user
      })
    },
  },
}
</script>

<style>
</style>
