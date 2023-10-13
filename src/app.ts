import { redfinAddressScrape } from "./redfinScrape";
import { Address, MlsId } from "./scrape_classes";
import { error } from "console";

const scrapeType = {"scrapeType": "address",
                      "scrapeRequest": {
                        "address": "719 Rimview Ln W",
                        "address2": "",
                        "city": "Twin Falls",
                        "state": "ID",
                        "zipcode": "83301"
                      }}

// const scrapeMls = {"scrapeType": "mlsId",
//                     "scrapeRequest": {
//                       "mlsId": "98874658",
//                       "mlsSource": "imls"
//                     }}


// FUNCS
async function getMlsByAddress(address: string, city: string, state: string, zipcode: string, address2?: string){
  const lookupAddress = new Address(address, city, state, zipcode, address2);
  console.log(lookupAddress.redfinAddress);  
  return await exports.handler(lookupAddress.redfinAddress);
}

async function getMlsByMls(mls: string, mlsSource?: string){
  const lookupMls = new MlsId(mls, mlsSource)
  return await redfinAddressScrape(lookupMls.mlsId);
}
// FUNCS



// different objects for testing purposes
function pickAScrape(scrapetype: string) {
  const info = scrapeType["scrapeRequest"];
  if (scrapeType["scrapeType"] === "address") {
    return getMlsByAddress(info["address"], info['city'], info['state'],info['zipcode'],info['address2'])    
    }
   else if (scrapeType["scrapeType"] === "mlsId") {
    return getMlsByMls(info["mlsId"], info["mlsSouce"])    
  } else {
    throw error;
  }
}

// function pickAScrape2(scrapetype: string) {
//   const info = scrapeMls["scrapeRequest"];
//   if (scrapeMls["scrapeType"] === "address") {
//     getMlsByAddress(info["address"], info['city'], info['state'],info['zipcode'],info['address2'])    
//     }
//    else if (scrapeMls["scrapeType"] === "mlsId") {
//     getMlsByMls(info["mlsId"], info["mlsSouce"])    
//   } else {
//     throw error;
//   }
// }
