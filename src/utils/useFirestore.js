import { useState, useEffect } from "react";
import { db } from "./firebase";

export const useFirestore = () => {
  const [comments, setCommets] = useState([]);

  useEffect(() => {
    db.collection("cyland")
      .orderBy("id", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setCommets(data);
      });
  }, []);

  return comments;
};
