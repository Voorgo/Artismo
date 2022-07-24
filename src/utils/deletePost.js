import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

const deletePost = async (deletePost, post, username, allPosts) => {
  const storage = getStorage();
  const imageRef = ref(storage, post.path);
  deleteObject(imageRef)
    .then(() => {
      deletePost((prev) => !prev);
    })
    .catch((error) => console.log(error));
  try {
    let filtered = allPosts.filter(
      (postAndLikes) => postAndLikes.path !== post.path
    );
    await updateDoc(doc(db, "posts", `${username}`), {
      imageSrcAndLikes: filtered,
    });
  } catch (error) {
    console.log(error);
  }
};

export default deletePost;
