// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import db from "../../firebase/config";

// const auth = getAuth();

export const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, setState) => {
    console.log("nickname, email, password", nickname, email, password);
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

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, setState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, setState) => {
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
