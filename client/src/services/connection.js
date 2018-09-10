export const connection = (route, method, options = {param: false, body: false}) => {
  if (options.param) {
    route = route + options.param;
  }
  let fetchOptions = {
    method: method,
    headers: authHeader(0),
  };

  if (options.body) {
    fetchOptions = {
      method: method,
      headers: authHeader(1),
      body: JSON.stringify(options.body),
    };
  }

  return fetch(route, fetchOptions).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 400) {
        return response.json().then((message) => Promise.reject(message.message));
      }
      if (response.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        return Promise.reject("Dane autoryzacji nie zostały uwierzytelnione, nastąpiło wylogowanie! errorCode " + response.status);
      }
      if (response.status === 404) {
        return Promise.reject("Zasób nie został znaleziony, proszę spróbuj ponownie!");
      }
      return Promise.reject(response.statusText + " code " + response.status);
    }
  });
  // .then(data => jwt_decode(data));
};

const authHeader = (type = 0) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let user = JSON.parse(localStorage.getItem("user"));

  if (type === 0) {
    if (token) {
      return {
        "Authorization": "Bearer " + token,
        "PDUser": user.id
      };
    } else {
      return {};
    }
  }
  if (type === 1) {
    if (token) {
      return {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "PDUser": user.id
      };
    } else {
      return {
        "Content-Type": "application/json"
      };
    }
  }
};