<template>
  <div class="container">
    <v-alert dense icon="mdi-information" text type="info" color="blue">
      While creating the template preferably put all your CSS in a style inside
      the body or make it inline.
    </v-alert>
    <v-alert
      dense
      icon="mdi-alert-circle-outline"
      text
      type="error"
      color="red"
    >
      The rendered version on the right side isn't an accurate representaion of
      what the email will look like.
    </v-alert>
    <v-row
      style="margin: 1rem 0; display: flex; justify-content: space-between;"
    >
      <v-col>
        <v-btn color="danger" text @click="content = ''">
          clear
        </v-btn>
        <v-btn color="primary" text @click="$router.push('/templates/rules')">
          Templating Rules
        </v-btn><br><br>
        <v-dialog
          transition="dialog-bottom-transition"
          max-width="600"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
            >
              Embed Image(s)
            </v-btn>
          </template>
          <template #default="dialog">
            <Embed @exit="dialog.value = false;" />
          </template>
        </v-dialog>
      </v-col>
      <v-col>
        <v-row>
          <v-text-field v-model="templateName" label="Template name" />
          <v-btn color="primary">
            Test
          </v-btn>
          <v-btn color="primary" outlined style="margin-left: 0.3rem" @click="upload">
            Create
          </v-btn>
        </v-row>
        <v-row>
          <v-checkbox
            v-model="makePublic"
            label="Make this public for others to re-use"
          />
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <client-only>
          <MonacoEditor
            :options="options"
            custom-class="myClass"
            custom-style="height:500px"
            @onChange="onChange"
          />
        </client-only>
      </v-col>
      <v-col style="padding: 2rem; overflow: hidden" v-html="options.value" />
    </v-row>
  </div>
</template>

<script>
import Embed from '@/components/embed'
export default {
  components: {
    Embed
  },
  layout: 'dashboard',
  data () {
    return {
      templateName: null,
      options: {
        value: `<h1>Hello</h1>
<h3>This is what your mail might look like</h3>
<p> 
    But there are major rules when it comes html on emails. <br>
    <a href="/templates/rules" target="_blank">Here</a> is a guide to the same
</p>`,
        language: 'html',
        fontSize: '13px',
        automaticLayout: true,
        theme: 'vs-dark',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        minimap: false
      },
      makePublic: true
    }
  },
  head: {
    title: 'Upload template'
  },
  methods: {
    onChange (newValue) {
      this.options.value = newValue.value
    },
    upload () {
      this.$axios
        .post('https://g-notify.herokuapp.com/api/templates/createTemplate', {
          content: this.content,
          name: this.templateName,
          likes: 0,
          user: JSON.parse(localStorage.getItem('user'))._id,
          public: this.makePublic
        })
        .then((response) => {
          this.$store.commit('systemConfig/SNACKBAR', {
            show: true,
            type: 'success',
            text: response.data.message
          })
          this.$router.push('/templates')
        })
        .catch((error) => {
          this.$store.commit('systemConfig/SNACKBAR', {
            show: true,
            type: 'danger',
            text: error.message
          })
        })
    }
  }
}
</script>
