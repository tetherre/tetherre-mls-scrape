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

  export { Address };