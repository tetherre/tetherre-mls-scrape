import { tetherScrape } from "./scrape";
import { Address } from "./address_class";


function getMlsByAddress(address: string, zipcode: string){
  const lookupAddress = new Address(address, zipcode);
  console.log(lookupAddress.fullAddress);  

  tetherScrape(lookupAddress.fullAddress);
}

getMlsByAddress('6792 houston st', '90620');