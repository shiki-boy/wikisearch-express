import { model, Schema, Document } from "mongoose";
import { Search } from "@interfaces/models.interface";
import userModel from "./User";

const ObjectId = Schema.Types.ObjectId;

const searchSchema: Schema = new Schema(
  {
    query: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: userModel,
      required: true,
      // validate: {
      //   validator: (userId: string) => {
      //     return false;
      //   },
      //   message: "No such user",
      // },
    },
  },
  { timestamps: true }
);

const searchModel = model<Search & Document>("Search", searchSchema);

export default searchModel;
