const puppeteer = require("puppeteer");

async function getPuppeteer() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //   await page.goto("https://schiphol.dutchplanespotters.nl/");
  await page.goto("https://schiphol.dutchplanespotters.nl/departures.php");
  const headers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("table thead tr")).map((tr) => {
      return Array.from(tr.querySelectorAll("th")).map((th) => {
        return th.innerText;
      });
    });
  });
  const data = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("table tr")).map((tr) => {
      return Array.from(tr.querySelectorAll("td")).map((td) => {
        return td.innerText;
      });
    });
  });

  //   console.log("data[2]", data[2]);
  //   console.log("headers[0]", headers);

  await browser.close();
  return { headers: headers[1], data: data.slice(2) };
}

function getFlightData() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await getPuppeteer();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = getFlightData;
