const HandleBars = require('handlebars')

HandleBars.registerHelper('loud', (string) => {
  return string.toUpperCase()
})

HandleBars.registerHelper('timeStampTime', (timeStamp) => {
  const date = new Date(timeStamp * 1000)
  return `${date.getHours()}:${date.getMinutes()}`
})

HandleBars.registerHelper('timeStampDate', (timeStamp) => {
  const date = new Date(timeStamp * 1000)
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
})
