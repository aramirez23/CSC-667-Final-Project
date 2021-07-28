import express from "express";
import bodyParser from "body-parser";
import {login, LoginRequest} from "./service/Login";
import {register, RegisterRequest} from "./service/Register";
import cors from "cors";
import {getUser, getUserId, lookupUserNoRes} from "./service/User";
import {createListing, CreateListingRequest, getListing, getListings} from "./service/Listing";
import {ListingResponse} from "./model/ListingModel";
import {SendMessageRequest} from "./model/MessageModels";
import {getMessages, sendMessage} from "./service/Message";
import { CartItemRequest, deleteCartItemRequest } from "./model/CartItemModel";
import { deleteCartItem, getCart, postToCart } from "./service/Cart";

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.json());
app.use(cors());

app.post( '/backend/api/register', ( req, res ) => {
  const body: RegisterRequest = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  }
  register(res, body);
} );

app.post('/backend/api/login', ( req, res ) => {
  const body: LoginRequest = {
    email: req.body.email,
    password: req.body.password,
  }
  login(res, body);
} );

app.get('/backend/api/user', ( req, res ) => {
  const {cookie} = req.query;
  if (cookie !== undefined && cookie !== '') {
    getUser(res, cookie.toString())
  } else {
    res.send({});
  }
} );

app.get('/backend/api/user-id', ( req, res ) => {
  const {cookie} = req.query;
  if (cookie !== undefined && cookie !== '') {
    getUserId(res, cookie.toString())
  } else {
    res.send({});
  }
} );

app.get('/backend/api/listing/:listingId', (req, res) => {
  const { listingId } = req.params;
  getListing(res, listingId, (listingModel => {
    lookupUserNoRes(listingModel.partyId, (party => {
      const listingResponse: ListingResponse = {
        listingModel: listingModel,
        user: party,
      }
      res.send(listingResponse);
    }))
  }));
} );

app.get('/backend/api/listing/category/:category', (req, res) => {
  const { category } = req.params;
  getListings(res, category);
} );

app.post('/backend/api/listing', (req, res) => {
  const {cookie} = req.query;
  const request: CreateListingRequest = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    sessionCookie: cookie?.toString() ?? '',
  }
  createListing(res, request);
} );

app.post('/backend/api/message', (req, res) => {
  const {cookie} = req.query;
  const request: SendMessageRequest = {
    message: req.body.message,
    toPartyId: req.body.toPartyId,
    sessionCookie: cookie?.toString() ?? '',
  }
  sendMessage(res, request);
} );

app.get('/backend/api/message', ( req, res ) => {
  const {cookie} = req.query;
  if (cookie !== undefined && cookie !== '') {
    getMessages(res, cookie.toString())
  } else {
    res.send({});
  }
} );

app.post('/backend/api/postToCart', (req, res) => {
  const {cookie} = req.query;
  const request: CartItemRequest = {
    title: req.body.title,
    price: req.body.price,
    listingId: req.body.listingId,
    sessionCookie: cookie?.toString() ?? '',
  }
  postToCart(res, request);
});

app.get('/backend/api/getCart', (req, res) => {
  const {cookie} = req.query;
  if (cookie !== undefined && cookie !== '') {
    getCart(res, cookie.toString());
  }
  else {
    res.send({});
  }
});

app.get('/backend/api/deleteCartItem/:listingId', (req, res) => {
  const {cookie} = req.query;
  const { listingId } = req.params;
  const request: deleteCartItemRequest = {
    listingId: listingId,
    sessionCookie: cookie?.toString() ?? '',
  }
  deleteCartItem(res, request);
});

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );