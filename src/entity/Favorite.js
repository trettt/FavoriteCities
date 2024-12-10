import { EntitySchema } from "typeorm";

export const Favorite = new EntitySchema({
  name: "Favorites",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    email: {
      type: "varchar",
    },
    cities: {
      type: "simple-array",
    },
  },
});
