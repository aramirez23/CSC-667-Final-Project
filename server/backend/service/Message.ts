import mongo from "mongodb";
import {mongoUrl, redisHost} from "./DbAccess";
import redis from "redis";
import {User} from "../model/User";
import {lookupUser} from "./User";
import {MessageModel, SendMessageRequest} from "../model/MessageModels";
import {UserSessionModels} from "../model/UserSessionModels";

const client = redis.createClient({host: redisHost});

export const sendMessage = (res: any, sendMessageRequest: SendMessageRequest) => {
  client.get(sendMessageRequest.sessionCookie, (err, reply) => {
    reply ? lookupUser(res, reply, (party: User) => {
      continueSendMessage(res, sendMessageRequest, party);
    }) : res.send({});
  });
};

const continueSendMessage = (res: any, sendMessageRequest: SendMessageRequest, party: User) => {
  const messageModel: MessageModel = {
    message: sendMessageRequest.message,
    toPartyId: sendMessageRequest.toPartyId,
    fromPartyId: party._id ?? '',
    fromName: `${party.firstName} ${party.lastName}`,
    date: new Date(),
  };
  mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('message')
    .insertOne(messageModel)
    .then((inserted) => {
      publishRedisMessageAlert(sendMessageRequest);
      res.send({
        messageModel,
        id: inserted.insertedId.toString(),
      })
    })
    .catch(() => res.send({}))
  });
};

export const createRedisSession = (userSession: UserSessionModels) => {
  client.set(userSession.uuid, userSession.partyId.toString());
}

const publishRedisMessageAlert = (sendMessageRequest: SendMessageRequest) => {
  client.publish('messageAlert', sendMessageRequest.toPartyId);
}

export const getMessages = (res: any, sessionCookie: string) => {
  client.get(sessionCookie, (err, reply) => {
    reply ? lookupUser(res, reply, (party: User) => {
      continueGetMessages(res, party);
    }) : res.send({});
  });
};

const continueGetMessages = (res: any, party: User) => {
  mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('message')
    .find({toPartyId: party._id?.toString()})
    .sort({date: -1})
    .toArray()
    .then((list: any) => {
      res.send(list)
    })
    .catch(() => {
      res.send({});
    })
  });
};
