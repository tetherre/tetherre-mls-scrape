import puppeteer from "puppeteer";

import { removeSymbols } from "./helper";

class Address {
  address: string;
  zipcode: string;

  constructor(
    address: string,
    zipcode: string
  ) {
    this.address = address;
    this.zipcode = zipcode;
  }

  get fullAddress(): string {
    return `${this.address}, ${this.zipcode}`;
  }
}

function getMlsAddress(address: string, zipcode: string){
  const lookupAddress = new Address(address, zipcode);
  console.log(lookupAddress.fullAddress);  

  tetherScrape(lookupAddress.fullAddress);
}

async function tetherScrape(mlsOrAddress: string) {
  const browser = await puppeteer.launch({
    executablePath: puppeteer.executablePath("chrome"),
    headless: false,
    defaultViewport: null,
  });
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  await page.goto("https://www.redfin.com/");
  console.log("launched");

  await page.type("#search-box-input", mlsOrAddress, { delay: 0 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click(".inline-block.SearchButton.clickable.float-right"),
  ]);
  console.log("waiting");

  const infoX = await page.$$("[class='statsValue']");

  const [price, bathrooms, bedrooms, sqft] = await Promise.all([
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
  const cityStateZip = await (
    await cityStateZipX?.getProperty("textContent")
  )?.jsonValue();
  console.log(cityStateZip);
  const city = cityStateZip?.split(",")[0];
  const state = cityStateZip?.split(",")[1].split(" ")[1];
  const zip = cityStateZip?.split(",")[1].split(" ")[2];

  // ACRES
  const acresX = await page.$$("[class='table-value']");
  const acresXLabel = await page.$$("[class='table-label']");
  const acresLabel = await (
    await acresXLabel[4].getProperty("textContent")
  ).jsonValue();
  const acresValue = await (
    await acresX[4].getProperty("textContent")
  ).jsonValue();
  const acres = acresValue?.replace(" Acre", "");
  console.log(acres);
  console.log('label ' + acresLabel)

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
      acresLabel: acres,
      city: city,
      state: state,
      zip: zip,
    },
  };

  const mlsData = JSON.stringify(res);
  console.log(mlsData);

  return mlsData;
}
// tetherScrape("719 Rimview Lane West, Twin Falls, ID 92407");
// tetherScrape("98874658");
getMlsAddress('3626 N Woody Dr', '83703');
