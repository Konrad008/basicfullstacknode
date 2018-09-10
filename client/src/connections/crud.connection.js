import { connection } from "../services";

export const crudConnection = {
  get: () => connection("api/view", "GET"),
  delete: (id) => connection("api/delete?id=", "DELETE", { param: id }),
  add: (data) => connection("api/insert", "POST", { body: data }),
  edit: (data) => connection("api/edit", "PUT", { body: data })
};