import dotenv from "dotenv";
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionManager
} from "typeorm";
import ReadList from "../model/ReadList";

dotenv.config();

const CONNECTION_NAME = "default";

const connectionOptions: ConnectionOptions = {
  name: CONNECTION_NAME,
  type: "mysql",
  port: 3306,
  synchronize: true,
  logging: true,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [ReadList]
};

const connectionManager = getConnectionManager();

export async function getConnection() {
  let connection: Connection;

  if (connectionManager.has(CONNECTION_NAME)) {
    connection = await connectionManager.get(CONNECTION_NAME);

    if (!connection.isConnected) {
      connection.connect();
    }
  } else {
    connection = await createConnection(connectionOptions);
  }

  return connection;
}
