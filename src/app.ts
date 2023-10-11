import { redfinAddressScrape } from "./redfinScrape";
import { Address } from "./address_class";

function getMlsByMls(mls: string){
  redfinAddressScrape(mls);
}

function getMlsByAddress(address: string, city: string, state: string, zipcode: string, address2?: string){
  const lookupAddress = new Address(address, zipcode, city, state, address2);
  console.log(lookupAddress.redfinAddress);  

  redfinAddressScrape(lookupAddress.redfinAddress);
}

