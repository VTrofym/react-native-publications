import db from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ nickname, email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: nickname,
      });

      const { uid, displayName } = await db.auth().currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
    } catch (error) {
      console.log("error", error);

      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
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

export const authStateChangeUser = () => async (dispatch, getState) => {};
