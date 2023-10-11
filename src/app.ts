import { redfinAddressScrape } from "./redfinScrape";
import { Address } from "./address_class";


function getMlsByAddress(address: string, city: string, state: string, zipcode: string, address2?: string){
  const lookupAddress = new Address(address, zipcode, city, state, address2);
  console.log(lookupAddress.redfinAddress);  

  redfinAddressScrape(lookupAddress.redfinAddress);
}

getMlsByAddress('719 Rimview Ln W','Twin Falls', 'ID', '83301');