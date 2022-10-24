import { collection, addDoc } from "firebase/firestore";
import { firestore } from "./firebase-setup";

export const writeToDB = async (data) => {
  try {
    await addDoc(collection(firestore, "Goals"), data);
  } catch (err) {
    console.log(err);
  }
};

