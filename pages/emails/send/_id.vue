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
            @click="send"
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
                v-for="item in emails"
                :key="item.name"
              >
                <td>{{ item }}</td>
                <td>
                  <v-btn
                    color="red"
                    plain
                    elevation="0"
                  >
                    Add
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="6" v-html="template.content" />
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  asyncData: async ({ params, $axios }) => {
    const templateId = params.id
    const tempData = await $axios.get(`/api/templates/${templateId}`)
    console.log(tempData.data.template)
    return {
      template: tempData.data.template
    }
  },
  data () {
    return {
      email: null,
      emails: []
    }
  },
  head: {
    title: 'G-Notify - Send Email'
  }
}
</script>
