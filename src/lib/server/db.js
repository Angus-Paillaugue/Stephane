import { MongoClient } from "mongodb";
import { MONGODB_CONNEXION_STRING } from "$env/static/private";

const client = new MongoClient(MONGODB_CONNEXION_STRING);
await client.connect();

const database = client.db('Stephane');

const coiffeursRef = database.collection("coiffeurs");
const usersRef = database.collection("users");
const bookingsRef = database.collection("bookings");
const prestationsRef = database.collection("prestations");
const ratingsRef = database.collection("ratings");

export { coiffeursRef, usersRef, bookingsRef, prestationsRef, ratingsRef }