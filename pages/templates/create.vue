<template>
  <div class="container">
    <v-row style="margin: 1rem 0; display: flex; justify-content: space-between;">
      <div>
        <v-btn color="danger" text @click="content = ''">
          clear
        </v-btn>
        <v-btn color="primary" text @click="$router.push('/templates/rules')">
          Templating Rules
        </v-btn>
      </div>
      <v-btn color="primary">
        Test
      </v-btn>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <AceEditor
          v-model="content"
          lang="html"
          theme="monokai"
          width="100%"
          height="75vh"
          :options="{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            fontSize: 14,
            highlightActiveLine: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            showPrintMargin: false,
            showGutter: true
          }"
          :commands="[
            {
              name: 'save',
              bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
              exec: dataSumit,
              readOnly: true
            }
          ]"
          @init="editorInit"
        />
      </v-col>
      <v-col style="padding: 2rem;" v-html="content" />
    </v-row>
  </div>
</template>

<script>
let AceEditor
if (process.client) { AceEditor = require('vue2-ace-editor') }
export default {
  components: {
    AceEditor
  },
  layout: 'dashboard',
  data () {
    return {
      content:
`<h1>Hello</h1>
<h3>This is what your mail might look like</h3>
<p> 
    But there are major rules when it comes html on emails. <br>
    <a href="/templates/rules" target="_blank">Here</a> is a guide to the same
</p>`
    }
  },
  head: {
    title: 'Upload template'
  },
  methods: {
    dataSumit () {
      // code here
    },
    editorInit () {
      require('brace/ext/language_tools') // language extension prerequsite...
      require('brace/mode/html')
      require('brace/mode/javascript') // language
      require('brace/mode/less')
      require('brace/theme/monokai')
      require('brace/snippets/javascript') // snippet
    }
  }
}
</script>
