import { connection } from "../services";

export const crudConnection = {
  get: () => connection("crud/", "GET"),
  delete: id => connection("crud/", "DELETE", { param: id }),
  add: data => connection("crud/", "POST", { body: data }),
  edit: data => connection("crud/", "PUT", { param: data.id, body: data })
};
