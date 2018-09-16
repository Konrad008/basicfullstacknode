import { connection } from "../services";

export const categoryConnection = {
  getAll: () => connection("categories/", "GET"),
  delete: id => connection("categories/", "DELETE", { param: id }),
  add: category => connection("categories/", "POST", { body: category }),
  edit: category =>
    connection("categories/", "PUT", { param: category.id, body: category })
};
