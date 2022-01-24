/* File help from github 
 *https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
 */

import mongoose from "mongoose";

// Get all environments variables
const {DATABASE_URL} = process.env;

// Check if the database url is set
if(!DATABASE_URL) {
    throw new Error("DATABASE_URL must be set in environment file");
}

// Cache the connection
let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

// Make a function to connect to the database
async function dbConnect() {
    // If the connection is already established, return the connection
    if(cached.conn) {
        return cached.conn;
    }
    // if the connection is not established, create a new connection
    if(!cached.promise) {

        // buffercommand is used to prevent the connection from being closed
        const opts = {
            bufferCommands: false,
        }

        // cached promise is set to the connection
        cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
            return mongoose;
        });
    }

    // return the connection
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;