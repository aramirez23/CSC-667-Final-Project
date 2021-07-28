import mongo from "mongodb";
import {mongoUrl} from "./DbAccess";
import bcrypt from "bcrypt";
import {User} from "../model/User";
import {UserSessionModels, UserSessionResponse} from "../model/UserSessionModels";
import {v4 as uuidv4} from 'uuid';
import {createRedisSession} from "./UserSession";

export interface RegisterRequest {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

const failure: UserSessionResponse = {
  success: false,
  cookieValue: '',
  errorMsg: 'Email already registered',
};

export const register = (res: any, registerRequest: RegisterRequest) => {
  mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('party')
    .findOne({email: registerRequest.email})
    .then((user: User | null) => user ? res.send(failure) : createUser(res, registerRequest))
    .catch(() => res.send(failure))
  });
}

const createUser = (res: any, registerRequest: RegisterRequest) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(registerRequest.password, salt, function (err, hash) {
      mongo.connect(mongoUrl, (err, client) => {
        const user: User = {
          firstName: registerRequest.firstName,
          lastName: registerRequest.lastName,
          email: registerRequest.email,
          salt: salt,
          passwordHash: hash,
        }
        const db = client.db('user')
        db.collection('party')
        .insertOne(user)
        .then((inserted) => createSession(res, inserted))
        .catch(() => res.send(failure))
      });
    });
  });
};

const createSession = (res: any, inserted: any) => {
  const uuid = uuidv4();
  const userSessionResponse: UserSessionResponse = {
    success: true,
    cookieValue: uuid,
    errorMsg: '',
  };
  const userSession: UserSessionModels = {
    uuid: uuid,
    partyId: inserted.insertedId,
  }
  createRedisSession(userSession);
  res.send(userSessionResponse);
}
