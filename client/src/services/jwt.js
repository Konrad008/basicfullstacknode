import jwtDecode from 'jwt-decode';

export const jwt_decode = (token) => {
  let payload = jwtDecode(token);
  delete payload.jti;
  delete payload.exp;
  delete payload.iat;

  console.log(payload);
  // localStorage.setItem("token", JSON.stringify(token));

  return payload;
};