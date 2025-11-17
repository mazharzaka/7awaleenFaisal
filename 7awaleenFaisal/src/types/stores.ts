// types/Store.ts
export interface Location {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Store {
  _id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  imageURL: string;
  isDeleted: boolean;
  subscription: boolean;
  rateview: number;
  location: Location;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
