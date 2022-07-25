import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

const deletePost = async (post) => {
  const storage = getStorage();
  const imageRef = ref(storage, post.path);
  deleteObject(imageRef)
    .then(() => {})
    .catch((error) => console.log(error));
  try {
    await deleteDoc(doc(db, "posts", `${post.id}`));
  } catch (error) {
    console.log(error);
  }
};

export default deletePost;
