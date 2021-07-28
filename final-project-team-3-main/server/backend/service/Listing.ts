import mongo from "mongodb";
import {mongoUrl, redisHost} from "./DbAccess";
import redis from "redis";
import {User} from "../model/User";
import {lookupUser} from "./User";
import {ListingModel} from "../model/ListingModel";
import {ObjectId} from "bson";

const client = redis.createClient({host: redisHost});

export interface CreateListingRequest {
  title: string,
  price: number,
  description: string,
  category: string,
  sessionCookie: string,
}

export const getListing = (res: any, listingId: string, cb: (listingModel: ListingModel) => void) => {
  return mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('listing')
    .findOne({_id: new ObjectId(listingId)})
    .then(cb)
  });
}

export const getListings =  (res: any, category: string) => {
  return mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('listing')
    .find({category: category})
    .toArray()
    .then((list: any) => {
      res.send(list)
    })
    .catch(() => {
      res.send({});

    })
  });
}

export const createListing = (res: any, createListingRequest: CreateListingRequest) => {
  client.get(createListingRequest.sessionCookie, (err, reply) => {
    reply ? lookupUser(res, reply, (party: User) => {
      continueCreateListing(res, createListingRequest, party);
    }) : res.send({});
  });
}

const continueCreateListing = (res: any, createListingRequest: CreateListingRequest, party: User) => {
  const listingModel: ListingModel = {
    title: createListingRequest.title,
    price: createListingRequest.price,
    description: createListingRequest.description,
    category: createListingRequest.category,
    partyId: party._id ?? '',
  };
  mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('listing')
    .insertOne(listingModel)
    .then((inserted) => res.send({
      listingModel,
      id: inserted.insertedId.toString(),
    }))
    .catch(() => res.send({}))
  });
}
