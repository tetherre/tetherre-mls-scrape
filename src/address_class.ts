class Address {
    address: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
  
    constructor(
      address: string,
      address2: string,
      city: string,
      state: string,
      zipcode: string
    ) {
      this.address = address;
      this.address2 = address2;
      this.city = city;
      this.state = state;
      this.zipcode = zipcode;
    }
  
    get redfinAddress(): string {
      return `${this.address}, ${this.zipcode}`;
    }
  }

  export { Address };