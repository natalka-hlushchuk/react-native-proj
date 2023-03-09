import db from "../../firebase/config.js";

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getSatte) => {
    console.log("login, email, password", login, email, password);
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

const authSignInUser = () => async (dispatch, getSatte) => {};
const authSignOutUser = () => async (dispatch, getSatte) => {};
