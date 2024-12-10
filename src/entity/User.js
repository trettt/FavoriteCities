import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "Users",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
});
