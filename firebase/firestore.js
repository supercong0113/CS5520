import { async } from "@firebase/util";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore, auth } from "./firebase-setup";

export const writeToDB = async (data) => {
  try {
    await addDoc(collection(firestore, "Goals"), {
      ...data,
      user: auth.currentUser.uid,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFromDB = async (key) => {
  try {
    await deleteDoc(doc(firestore, "Goals", key));
  } catch (err) {
    console.log(err);
  }
};
