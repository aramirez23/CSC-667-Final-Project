import {User} from "./User";

export interface ListingModel {
  title: string,
  price: number,
  description: string,
  category: string,
  partyId: string,
}

export interface ListingResponse {
  listingModel: ListingModel,
  user: User,
}
