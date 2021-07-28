export interface SendMessageRequest {
  toPartyId: string;
  message: string;
  sessionCookie: string;
}

export interface MessageModel {
  message: string;
  date: Date;
  fromName: string;
  toPartyId: string;
  fromPartyId: string;
}
