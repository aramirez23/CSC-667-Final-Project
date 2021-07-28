import mongo from "mongodb";
import {mongoUrl, redisHost} from "./DbAccess";
import {User} from "../model/User";
import redis from "redis";
import {ObjectId} from "bson";


const client = redis.createClient({ host: redisHost });

export const getUserId = (res: any, userSessionUuid: string) => {
  client.get(userSessionUuid, (err, reply) => {
    reply ? res.send({partyId: reply}) : res.send({});
  });
}
export const getUser = (res: any, userSessionUuid: string) => {
  client.get(userSessionUuid, (err, reply) => {
    reply ? lookupUser(res, reply, (party: User) => {
      return res.send({
        firstName: party.firstName,
        lastName: party.lastName,
        email: party.email,
      })
    }) : res.send({});
  });
}

export const lookupUser = (res: any, userId: string, cb: (party: User) => void) => {
  return mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('party')
    .findOne({_id: new ObjectId(userId)})
    .then(cb)
  });
}


export const lookupUserNoRes = (userId: string, cb: (party: User) => void) => {
  return mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('party')
    .findOne({_id: new ObjectId(userId)})
    .then(cb)
  });
}
