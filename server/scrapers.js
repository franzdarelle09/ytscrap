const puppeteer = require('puppeteer')

async function scrapeChannel(url){

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [el] = await page.$x('/html/body/ytd-app/div/ytd-page-manager/ytd-browse/div[3]/ytd-c4-tabbed-header-renderer/app-header-layout/div/app-header/div[2]/div[2]/div/div[1]/div/div[1]/ytd-channel-name/div/div/yt-formatted-string')
    const txt = await el.getProperty('textContent')
    const name = await txt.jsonValue()

    const [el3] = await page.$x('//*[@id="subscriber-count"]')
    const txt2 = await el3.getProperty('textContent');
    const subscribers = await txt2.jsonValue();

    const [el2] = await page.$x('//*[@id="img"]')
    const src = await el2.getProperty('src')
    const avatarUrl = await src.jsonValue()

    browser.close()
    console.log({name,avatarUrl,subscribers})
    return {name, avatarUrl,subscribers}
}

module.exports = {
    scrapeChannel
}

