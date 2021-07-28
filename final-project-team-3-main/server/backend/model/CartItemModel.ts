export interface CartItemRequest {
  title: string;
  price: number;
  listingId: string;
  sessionCookie: string;
}

export interface CartItemModel {
  title: string;
  price: number;
  listingId: string;
  buyerPartyId: string;
}

export interface deleteCartItemRequest {
  listingId: string;
  sessionCookie: string;
}

export interface deleteCartItemModel {
  listingId: string;
  buyerPartyId: string;
}