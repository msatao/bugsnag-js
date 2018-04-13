#!/usr/bin/env node

//
// Usage:
//   URL=http://the-url-you-want-to-visit:1234?ab=cd \
//   BROWSERSTACK_USERNAME=XXXXXX \
//   BROWSERSTACK_ACCESS_KEY=XXXXX \
//     ./remote_browser_page_load.js
//

const LOCAL_ID = process.env.BROWSERSTACK_LOCAL_IDENTIFIER || 'mazzzzeee'

const { Builder } = require('selenium-webdriver')

async function go () {
  let driver
  try {
    driver = await new Builder()
      .usingServer(
        `http://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}@hub.browserstack.com/wd/hub`
      )
      .withCapabilities({
        browserName: 'firefox',
        'browserstack.local': true,
        'browserstack.localIdentifier': LOCAL_ID
      })
      .build()
    await driver.get(process.env.URL)
    console.log(await driver.getTitle())
    setTimeout(() => driver.quit(), 1000)
  } catch (e) {
    console.log(e)
  } finally {
    if (driver) await driver.quit()
  }
}

go()
