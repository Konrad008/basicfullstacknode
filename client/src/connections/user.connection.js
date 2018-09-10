import { connection } from "../services";

export const userConnection = {
  login,
  logout,
  register: user => connection("/auth/register", "POST", { body: user }),
  getAll: () => connection("/auth", "GET")
};

function login(username, password) {
  return connection("/auth/authenticate", "POST", {
    body: { username, password }
  }).then(user => {
    if (user.token) {
      localStorage.setItem("token", JSON.stringify(user.token));
      delete user.token;
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  });
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
