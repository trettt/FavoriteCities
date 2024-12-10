import { DataSource } from "typeorm";
import { User } from "@/entity/User";
import { Favorite } from "@/entity/Favorite";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Favorite],
});

export default AppDataSource;
