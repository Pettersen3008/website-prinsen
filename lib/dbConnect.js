/* File from github 
 *https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
 */

import mongoose from "mongoose";

const {DATABASE_URL} = process.env;

if(!DATABASE_URL) {
    throw new Error("DATABASE_URL must be set in environment file");
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

async function dbConnect() {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {

        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;