import puppeteer from "puppeteer";
import chromium from 'chrome-aws-lambda';

import { removeSymbols } from "./helper";

exports.handler = async (context: string, callback: any) => {
    let result = null;
    let browser = null;

    try {
        const browser = await chromium.puppeteer.launch({
            args: chromium.args,           
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            defaultViewport: chromium.defaultViewport,
            ignoreHTTPSErrors: true,
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
    
        await page.goto("https://www.redfin.com/");
        console.log("launched");
    
        await page.type("#search-box-input", context, { delay: 0 });
        await Promise.all([
        page.waitForNavigation({ waitUntil: "domcontentloaded" }),
        page.click(".inline-block.SearchButton.clickable.float-right"),
        ]);
        console.log("waiting");
    
        const infoX = await page.$$("[class='statsValue']");  
        const [price, bedrooms, bathrooms, sqft] = await Promise.all([
        (await infoX[0].getProperty("textContent")).jsonValue(),
        (await infoX[1].getProperty("textContent")).jsonValue(),
        (await infoX[2].getProperty("textContent")).jsonValue(),
        (await infoX[3].getProperty("textContent")).jsonValue(),
        ]);
        console.log(price);
        console.log(bathrooms);
        console.log(bedrooms);
        console.log(sqft);
    
        const addressX = await page.$("[class='street-address']");
        const address = await (await addressX?.getProperty("textContent"))?.jsonValue();
        console.log('address: '+ address);
    
        const cityStateZipX = await page.$("[class='dp-subtext bp-cityStateZip']");
        const cityStateZip: string = await (
        await cityStateZipX?.getProperty("textContent")
        )?.jsonValue();
        console.log(cityStateZip);
        const city = cityStateZip?.split(",")[0];
        const state = cityStateZip?.split(",")[1].split(" ")[1];
        const zip = cityStateZip?.split(",")[1].split(" ")[2];
    
        const lotSizeX = await page.$$("[class='table-value']");
        const lotSize = await (
        await lotSizeX[4].getProperty("textContent")
        ).jsonValue();
        console.log(lotSize);
    
        const mlsX = await page.$("[class='ListingSource--mlsId']");
        const mls = await (await mlsX?.getProperty("textContent"))?.jsonValue();
        console.log(mls);
    
        const previewX = await page.$(".landscape");
        const previewSrc = (await previewX?.getProperty("src"))?.jsonValue();
        const promise = new Promise((resolve) => {
        resolve(previewSrc);
        });
        const preview = await Promise.resolve(promise);
        console.log(preview);
    
        await browser.close();
        console.log("closed");
    
        const res = {
        data: {
            preview: preview,
            mls: removeSymbols(mls as string),
            price: removeSymbols(price as string),
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            sqft: removeSymbols(sqft as string),
            lot_Size: lotSize,
            city: city,
            state: state,
            zip: zip,
        },
        };
    
        const mlsData = JSON.stringify(res);
        console.log(mlsData);
    
        // return mlsData;
        result = mlsData;
  } catch (error) {
    return callback(error);
  } finally {
    if (browser !== null) {
        await browser.close();
    }
  }
  return callback(null, result);
}
//   export {redfinAddressScrape};
