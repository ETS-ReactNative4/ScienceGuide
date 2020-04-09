import {
  ADD_INTEREST,
  DELETE_INTEREST,
  ADD_LEVEL,
  SELECT_MENTOR,
  LOGIN,
  SIGNUP,
  LOGOUT,
  UPDATE_USER,
  UPDATE_PROFILE,
} from "./types";

import DatabaseService from "../config/firebase";

const db = new DatabaseService();

export const addInterest = (interest) => ({
  type: ADD_INTEREST,
  data: { interest },
});

export const deleteInterest = (interest) => ({
  type: DELETE_INTEREST,
  data: { interest },
});

export const addLevel = (level) => ({
  type: ADD_LEVEL,
  data: { level },
});

export const selectMentor = (mentor, id) => ({
  type: SELECT_MENTOR,
  data: { mentor, id },
});

export const signup = (
  email,
  password,
  name,
  researchLevel,
  researchAreas,
  mentorName,
  mentorId
) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let resp = db.signUpUserWithEmail(
      email,
      password,
      name,
      researchLevel,
      researchAreas,
      mentorName,
      mentorId
    );
    resp
      .then((val) => {
        const user = {
          uid: val.cred.user.uid,
          email: val.cred.user.email,
          name: val.name,
          type: "Student",
        };

        dispatch({ type: SIGNUP, data: user });
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const login = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let resp = db.signInUserWithEmail(email, password);
    resp
      .then((val) => {
        const user = {
          uid: val.cred.user.uid,
          email: val.cred.user.email,
          name: val.name,
        };
        dispatch({ type: LOGIN, data: user });
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateProfileInformation = (user, type, changedInfo) => (
  dispatch
) => {
  return new Promise((resolve, reject) => {
    if (type === "Name") {
      if (user.name === changedInfo) {
        const error = {
          message: "Must update your name to a different one that before",
        };
        reject(error);
      } else {
        db.updateProfileInformation(user, type, changedInfo)
          .then(() => {
            console.log(user.type);
            console.log("succesfully updated the user's name");

            const updatedUser = {
              uid: user.uid,
              email: user.email,
              name: changedInfo,
              type: user.type,
            };
            console.log(updatedUser);
            dispatch({ type: UPDATE_PROFILE, data: updatedUser });
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      }
    }
  });
};

export const update = (user) => ({
  type: UPDATE_USER,
  data: user,
});

export const clear = () => ({
  type: LOGOUT,
});

export const logout = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    let resp = db.signOutUser();
    resp
      .then(() => {
        dispatch({ type: LOGOUT });
        resolve();
      })
      .catch((error) => {
        console.log("Error signing out", error);
        reject(error);
      });
  });
};
