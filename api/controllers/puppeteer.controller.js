const puppeteer = require('puppeteer')

const templateScreenshot = async (templateHTML, quality) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(templateHTML)
  await page.waitForTimeout(1000)
  const body = await page.$('body')
  const screenshot = await body.screenshot({
    type: 'jpeg',
    quality: quality === 'low' ? 30 : 100,
    fullPage: !(quality === 'low')
  })
  await page.close()
  await browser.close()

  return screenshot
}

module.exports = { templateScreenshot }
