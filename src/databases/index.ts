import {
  DB_PORT,
  MONGO_DBNAME,
  MONGO_HOST,
  MONGO_PASSWORD,
  MONGO_USERNAME,
} from "@config";

export const dbConnection = {
  url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${DB_PORT}/${MONGO_DBNAME}?authSource=admin`,
  // options: {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // },
};
