export interface User {
  _id?: string,
  firstName: string,
  lastName: string,
  email: string,
  salt: string,
  passwordHash: string,
}
