import mongo from "mongodb";
import {mongoUrl} from "./DbAccess";
import bcrypt from "bcrypt";
import {User} from "../model/User";
import {v4 as uuidv4} from "uuid";
import {UserSessionModels, UserSessionResponse} from "../model/UserSessionModels";
import {createRedisSession} from "./UserSession";

export interface LoginRequest {
  email: string,
  password: string,
}

const failure: UserSessionResponse = {
  success: false,
  cookieValue: '',
  errorMsg: 'Could not validate'
};

export const login = (res: any, loginRequest: LoginRequest) => {
      mongo.connect(mongoUrl, (err, client) => {
        const db = client.db('user')
        db.collection('party')
        .findOne({email: loginRequest.email})
        .then((user: User) => checkUser(user, res, loginRequest))
        .catch(() => res.send(failure))
      });
};

const checkUser = (user: User, res: any, loginRequest: LoginRequest) => {
  bcrypt.hash(loginRequest.password, user.salt, function (err, hash) {
    if (hash === user.passwordHash) {
      createSession(user, res);
    } else {
      console.log("failed on verifying pass")
      res.send(failure);
    }
  })
};

const createSession = (user: User, res: any) => {
  const uuid = uuidv4();
  const userSessionResponse: UserSessionResponse = {
    success: true,
    cookieValue: uuid,
    errorMsg: '',
  };
  const userSession: UserSessionModels = {
    uuid: uuid,
    partyId: user._id ?? '',
  }
  createRedisSession(userSession);
  res.send(userSessionResponse);
}
