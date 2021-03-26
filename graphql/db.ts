import dotenv from "dotenv";
import {
  ConnectionOptions,
  createConnection,
  getConnectionManager
} from "typeorm";
import ReadList from "./ReadList";

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

export async function connectDB() {
  const connectionManager = getConnectionManager();

  if (connectionManager.has(CONNECTION_NAME)) {
    const connection = connectionManager.get(CONNECTION_NAME);

    if (!connection.isConnected) {
      await connection.connect();
    }
  } else {
    await createConnection(connectionOptions);
  }
}
