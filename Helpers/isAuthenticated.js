import Cookies from "js-cookie";

const isAuthenticated = async () => {
  let myToken = Cookies.get("session-token");
  if (myToken == undefined) {
    return 0;
  } else {
    let apiAddress = `${location.protocol}//${location.hostname}:27469/?action=auth&token=${myToken}`;
    try {
      const res = await fetch(apiAddress);
      const data = await res.json();
      if (
        data.status == "AUTH_SUCCESFUL" &&
        data.username &&
        data.username.length
      ) {
        return data.username;
      } else {
        return 0;
      }
    } catch (err) {
      return 0;
    }
  }
};

export default isAuthenticated;
