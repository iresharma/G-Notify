<template>
  <v-card style="margin: 0.3rem; display: flex; flex-direction: column; justify-content: space-between;">
    <img
      :src="`/api/templates/renderTemplate?quality=low&id=${id}`"
      alt="rendered-out"
      style="width:100%"
    >
    <div>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle class="pb-0">
        Likes {{ likes }}
      </v-card-subtitle>
      <v-card-text class="text--primary">
        {{ desc }}
      </v-card-text>
      <v-card-actions>
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-thumb-up-outline</v-icon>
        </v-btn>
        <v-dialog v-model="dialog">
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-code-tags</v-icon>
            </v-btn>
          </template>
          <v-card>
            <pre>
        <code v-highlight="templateContent" class="language-html" />
      </pre>
          </v-card>
        </v-dialog>

        <v-btn color="primary" text @click="$router.push(`/emails/send/${id}`)">
          Use
        </v-btn>
        <v-btn color="primary" outlined @click="sendTest">
          Test
        </v-btn>
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
      // arr = new Uint8Array(arr) // if it's an ArrayBuffer
      return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
    }
  }
}
</script>
