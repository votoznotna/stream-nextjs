import mongoose from "mongoose";

export default async function createSession() {
  const MONGO_URL = process.env.MONGO_URL || "";
  if (!MONGO_URL) {
    throw new Error("Missing MONGO_URL");
  }

  await mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log(
        "Connected to Distribution API Database - Initial Connection"
      );
    })
    .catch((err) => {
      console.log(
        `Initial Distribution API Database connection error occured -`,
        err
      );
    });
}
