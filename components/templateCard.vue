<template>
  <v-card
    style="margin: 0.3rem; display: flex; flex-direction: column; justify-content: space-between;"
  >
    <img
      :src="`/api/templates/renderTemplate?quality=low&id=${id}`"
      alt="rendered-out"
    >
    <div>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-text class="text--primary">
        {{ desc }}
      </v-card-text>
      <v-card-actions class="action-bar">
        <div>
          <v-chip
            class="ma-2"
            color="blue-grey"
            label
            text-color="white"
            @click="addLike(id)"
          >
            <v-icon left>
              mdi-thumb-up-outline
            </v-icon>
            {{ likes }}
          </v-chip>
          <v-btn icon @click="$router.push(`/templates/create/${id}`)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-dialog v-model="dialog">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-code-tags</v-icon>
              </v-btn>
            </template>
            <v-card>
              <pre class="language-html">
                <code v-highlight="templateContent" />
              </pre>
            </v-card>
          </v-dialog>
        </div>

        <div>
          <v-btn color="blue" text @click="$router.push(`/emails/send/${id}`)">
            Use
          </v-btn>
          <v-btn
            outlined
            color="primary"
            elevation="2"
            small
            @click="sendTest"
          >
            Test
          </v-btn>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    templateUser: {
      type: Object,
      required: true
    },
    templateContent: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      src: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    sendTest () {
      this.$axios
        .get('/api/emails/sendTest', {
          params: {
            template: this.id,
            user: this.user.id
          }
        })
        .then((response) => {
          this.$store.commit('systemConfig/SNACKBAR', {
            show: true,
            type: 'success',
            text: 'Email sent to your email id'
          })
        })
        .catch((error) => {
          this.$store.commit('systemConfig/SNACKBAR', {
            show: true,
            type: 'danger',
            text: error.message
          })
        })
    },
    toBase64 (arr) {
      return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
    },
    addLike (id) {
      this.$axios.get(`/api/templates/${id}/like`).then((response) => {
        this.$emit('updateLikes', response.data.likes)
      })
    }
  }
}
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
