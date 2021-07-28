export interface UserSessionResponse {
  success: boolean,
  cookieValue: string,
  errorMsg: string,
}

export interface UserSessionModels {
  uuid: string,
  partyId: string,
}
