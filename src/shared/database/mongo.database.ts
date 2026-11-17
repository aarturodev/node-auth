import mongoose from "mongoose";

interface MongodatabaseOptions {
  uri: string;
  databaseName: string;
}

export class MongoDatabase {
  static async connect(options: MongodatabaseOptions): Promise<void> {
    await mongoose.connect(options.uri, {
      dbName: options.databaseName,
    });

    console.log("MongoDB connected");
  }
}
