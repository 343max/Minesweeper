// make sure to call
// expo start:web --config Icon/icon.json
// before running this

// node Icon/GenerateIcon.js - dumps an icon of each size directly into the ios project

const puppeteer = require("puppeteer")

;(async () => {
  const browser = await puppeteer.launch()

  const generateIcon = async sideLength => {
    const page = await browser.newPage()
    await page.setViewport({ width: sideLength, height: sideLength })
    await page.goto("http://localhost:19006/", {
      waitUntil: "domcontentloaded"
    })
    await page.screenshot({
      path: `ios/Minesweeper/Images.xcassets/AppIcon.appiconset/icon_${sideLength}.png`
    })
    await page.close()
  }

  await generateIcon(40)
  await generateIcon(60)
  await generateIcon(58)
  await generateIcon(87)
  await generateIcon(80)
  await generateIcon(120)
  await generateIcon(180)
  await generateIcon(1024)

  await browser.close()
})()
