import axios from "axios";
import { ENDPOINT } from "../endpoint";

export function toggleFavorite(id, favorite, setFavorite, user) {
  const copy = {
    ...favorite,
  }
  if (!favorite[id]) {
    try {
      axios.post(`${ENDPOINT}/saved`, {
        clinic_id: id,
        uid: user.uid
      })
        .then(() => {
          copy[id] = true;
          console.log(copy[id], "add");
        })
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      axios.delete(`${ENDPOINT}/saved`, { data: { uid: user.uid, clinic_id: id } })
        .then(() => {
          copy[id] = false;
          console.log(copy[id], "delete");
        });
    }
    catch (err) {
      console.error(err);
    }
  }
  setFavorite(copy);
}
