import { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import firebaseConfig from "constants/firebaseConfig";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const useFirestore = () => {
  const [comments, setComments] = useState<
    {
      [x: string]: any;
    }[]
  >([]);

  useEffect(() => {
    const q = query(collection(db, "cyland"), orderBy("id", "desc"));
    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => ({
        ...doc.data()
      }));
      setComments(data);
    });

    return () => unsubscribe();
  }, []);

  return comments;
};
