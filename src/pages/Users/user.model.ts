export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export type UserId = string;

export interface IUser {
    id: UserId;
    ind: number;
    name: string;
    email: string;

    region: string;
    department: string;
    age: number;
    currency: string;
    address: string;
    postalZip: string;
    country: string;
    alphanumeric: string;
    startdate: number;
    enddate: number;
    position: string;
    pan: string;
    trusted: boolean;
}