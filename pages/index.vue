<template>
  <div class="container">
    <h1 style="color: #4285F4">
      G-Notify
    </h1>
    <p>
      A simple gmail backed HTML mass mailer with a jam pack of features
    </p>
    <p v-if="isLogged">
      <v-btn elevation="3" color="primary" @click="$router.push('/home')">
        Dashboard
      </v-btn>
      <v-btn elevation="0" color="accent" plain href="https://github.com/iresharma/G-Notify">
        <v-icon dense color="accent darken-2" class="mx-2">
          mdi-github
        </v-icon>
        Contribute
      </v-btn>
    </p>
    <p v-else>
      <v-btn :loading="loading" elevation="3" color="primary" @click="authorize">
        Get Started
      </v-btn>
      <v-btn elevation="0" color="accent" plain>
        Learn More
      </v-btn>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: true
    }
  },
  head () {
    return {
      title: 'Home'
    }
  },
  computed: {
    ...mapGetters({ isLogged: 'auth/isLogged' })
  },
  mounted () {
    this.$store.commit('auth/LOAD_USER')
    this.loading = false
    if (this.$route.query.code) {
      this.sendCode(this.$route.query.code)
    }
  },
  methods: {
    authorize () {
      this.$axios
        .get('/api/auth', {
          params: {},
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          this.dialog = true
          window.open(response.data, '_blank')
        })
        .catch((error) => {
          this.$store.commit('systemConfig/SNACKBAR', {
            show: true,
            type: 'danger',
            text: error.message
          })
        })
    },
    sendCode (userCode) {
      this.$axios
        .post(
          '/api/auth',
          {
            code: userCode
          },
          {
            params: {},
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          this.dialog = false
          // console.log(response)
          this.$store.commit('auth/SET_USER', { ...response.data.userData })
          this.$router.push('/home')
        })
        .catch(error => this.$store.commit('systemConfig/SNACKBAR', {
          show: true,
          type: 'danger',
          text: error.message
        }))
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 100%;

  h1 {
    font-size: 5rem;
    font-weight: bold;
    margin-bottom: 1rem;

    text-shadow: 5px 5px rgb(241, 83, 83);
  }

  p {
    font-size: 1.5rem;
    font-weight: normal;
  }
}
</style>
