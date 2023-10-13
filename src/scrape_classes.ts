class Address {
    address: string;
    city: string;
    state: string;
    zipcode: string;
    address2: string;
  
    constructor(
      address: string,
      city: string,
      state: string,
      zipcode: string,
      address2: string
    ) {
      this.address = address;
      this.city = city;
      this.state = state;
      this.zipcode = zipcode;
      this.address2 = address2;
    }

    get redfinAddress(): string {
      if (this.address2 ?? '') {
        return `${this.address} ${this.address2}, ${this.zipcode}`;
      } else {
        return `${this.address}, ${this.zipcode}`;
      }
      
    }

    get fullAddress(): string {
        return `${this.address} ${this.address2}, ${this.city} ${this.state} ${this.zipcode}`;
      }

  }


  class MlsId {
    mlsId: string;
    mlsSource: string;
  
    constructor(
      mlsId: string,
      mlsSource: string,
    ) {
      this.mlsId = mlsId;
      this.mlsSource = mlsSource;
    }

  }


  export { Address, MlsId };