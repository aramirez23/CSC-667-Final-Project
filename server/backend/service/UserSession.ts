import {UserSessionModels} from "../model/UserSessionModels";
import redis from "redis";
import {redisHost} from "./DbAccess";

const client = redis.createClient({ host: redisHost });

export const createRedisSession = (userSession: UserSessionModels) => {
  client.set(userSession.uuid, userSession.partyId.toString());
}

