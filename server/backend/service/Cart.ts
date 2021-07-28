import mongo from "mongodb";
import {mongoUrl, redisHost} from "./DbAccess";
import redis from "redis";
import {User} from "../model/User";
import {lookupUser} from "./User";
import { CartItemRequest, CartItemModel, deleteCartItemRequest, deleteCartItemModel } from "../model/CartItemModel";

const client = redis.createClient({host: redisHost});

export const postToCart = (res: any, cartItem: CartItemRequest) => {
  client.get(cartItem.sessionCookie, (err, reply) => {
    reply ? lookupUser(res, reply, (party: User) => {
      continuePostToCart(res, cartItem, party);
    }) : res.send({});
  });
};

const continuePostToCart = (res: any, cartItem: CartItemRequest, party: User) => {
  const cartItemModel: CartItemModel = {
    title: cartItem.title,
    price: cartItem.price,
    listingId: cartItem.listingId,
    buyerPartyId: party._id?.toString() ?? '',
  };

  mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('cart')
    .insertOne(cartItemModel)
    .then((inserted) => res.send({
      cartItemModel,
      id: inserted.insertedId.toString(),
    }))
    .catch(() => res.send({}));
  });
};

export const getCart = (res: any, sessionCookie: string) => {
  client.get(sessionCookie, (err, reply) => {
    reply ? lookupUser(res, reply, (party: User) => {
      continueGetCart(res, party);
    }) : res.send({});
  });
};

const continueGetCart = (res: any, party: User) => {
  mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('cart')
    .find({buyerPartyId: party._id?.toString()})
    .toArray()
    .then((list: any) => {
      res.send(list)
    })
    .catch(() => {
      res.send({})
    })
  });
};

export const deleteCartItem = (res: any, cartItem: deleteCartItemRequest) => {
  client.get(cartItem.sessionCookie, (err, reply) => {
    reply ? lookupUser(res, reply, (party: User) => {
      continueDeleteCartItem(res, cartItem, party);
    }) : res.send({});
  });
};

const continueDeleteCartItem = (res: any, cartItem: deleteCartItemRequest, party: User) => {
  const deleteCartItemModel: deleteCartItemModel = {
    listingId: cartItem.listingId,
    buyerPartyId: party._id?.toString() ?? '',
  };

  mongo.connect(mongoUrl, (err, client) => {
    const db = client.db('user')
    db.collection('cart')
    .deleteMany({
      listingId: deleteCartItemModel.listingId,
      buyerPartyId: deleteCartItemModel.buyerPartyId,
    })
    .then((list: any) => {
      res.send(list);
    })
    .catch(() => {
      res.send({});
    })
  });
};