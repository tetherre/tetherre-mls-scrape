import { redfinScrape } from "./scrape";
import { Address } from "./address_class";


function getMlsByAddress(address: string, address2: string, city: string, state: string, zipcode: string){
  const lookupAddress = new Address(address, address2, city, state, zipcode);
  console.log(lookupAddress.redfinAddress);  

  redfinScrape(lookupAddress.redfinAddress);
}

getMlsByAddress('6792 houston st','','Buena Park', 'CA', '90620');