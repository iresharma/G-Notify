<template>
  <div class="container">
    <v-row>
      <v-col cols="6">
        <h1>Send Template</h1>
        <h4 style="margin-bottom: 1rem">
          Template: {{ template.name }}
        </h4>
        <v-row class="form-row">
          <v-text-field
            v-model="email"
            class="mx-2"
            label="Email"
            required
            @keydown.enter="emails.push(email)"
          />
          <v-btn
            color="success"
            class="mx-2"
            type="submit"
            @click="dialog = true"
          >
            Import
          </v-btn>
          <v-btn
            color="primary"
            class="mx-2"
            type="submit"
            @click="emails.push(email)"
          >
            Add
          </v-btn>
        </v-row>
        <br>
        <v-simple-table v-if="emails.length > 0">
          <template #default>
            <thead>
              <tr>
                <th class="text-left">
                  Email
                </th>
                <th class="text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in emails"
                :key="item.name"
              >
                <td>{{ item }}</td>
                <td>
                  <v-btn
                    color="red"
                    plain
                    elevation="0"
                    @click="emails.splice(index, 1)"
                  >
                    Remove
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="6" v-html="template.content" />
    </v-row>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Import Excel
        </v-card-title>

        <v-card-text>
          <v-file-input
            v-model="excel"
            counter
            show-size
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            placeholder="Upload xlsx file"
          />
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="importExcel"
          >
            Import
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="loader"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Processing Excel
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  asyncData: async ({ params, $axios }) => {
    const templateId = params.id
    const tempData = await $axios.get(`/api/templates/${templateId}`)
    return {
      template: tempData.data.template
    }
  },
  data () {
    return {
      email: null,
      emails: [],
      excel: null,
      dialog: false,
      loader: false
    }
  },
  head: {
    title: 'Send Email'
  },
  methods: {
    importExcel () {
      this.dialog = false
      this.loader = true
      const formData = new FormData()
      formData.append('excel', this.excel)
      this.$axios.post('/api/emails/importExcel', formData)
        .then((res) => {
          console.log(res.data)
          this.emails = res.data.list
          this.loader = false
        })
        .catch((err) => {
          console.log(err)
          this.loader = false
        })
    }
  }
}
</script>
