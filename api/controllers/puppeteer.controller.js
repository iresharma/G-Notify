const puppeteer = require('puppeteer')

const templateScreenshot = async (templateHTML, quality) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.content(templateHTML)
  const content = await page.$('body')
  const screenshot = await content.screenshot({ omitBackground: true, quality: quality === 'low' ? 30 : 100 })

  await page.close()
  await browser.close()

  return screenshot
}

export default { templateScreenshot }
