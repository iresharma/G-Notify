<template>
  <div class="container">
    <h1 style="color: #4285F4">
      G-Notify
    </h1>
    <p>
      A simple HTML based G-Notify for gmail accounts.<br>
      Made by <code>@iresharma</code> maintained by <code>@GDSC-NIE</code>
    </p>
    <p v-if="isLogged">
      <v-btn elevation="3" color="primary">
        Dashboard
      </v-btn>
      <v-btn elevation="0" color="accent" outlined rounded>
        <v-icon dense color="accent darken-2" class="mx-2">
          mdi-github
        </v-icon>
        Contribute
      </v-btn>
    </p>
    <p v-else>
      <v-btn elevation="3" color="primary" @click="authorize">
        Get Started
      </v-btn>
      <v-btn elevation="0" color="accent" outlined rounded>
        Learn More
      </v-btn>
    </p>
    <v-dialog
      v-model="dialog"
      persistent
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Enter the code</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="userCode"
              label="Enter code from the other page"
              required
            />
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="sendCode"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialog: false,
      userCode: null
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
  methods: {
    authorize () {
      this.$axios.get('/api/auth', {
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        this.dialog = true
        window.open(response.data, '_blank')
      }).catch((error) => {
        this.$store.commit('systemConfig/SNACKBAR', {
          show: true,
          type: 'danger',
          text: error.message
        })
      })
    },
    sendCode () {
      this.$axios.post('/api/auth', {
        code: this.userCode
      }, {
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => console.log(response)).catch(error => console.log(error))
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
  }

  p {
    font-size: 1.5rem;
    font-weight: normal;
  }
}
</style>
