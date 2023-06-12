import app from "./config";
import {
  getFirestore,
  getDocs,
  serverTimestamp,
  // setDoc,
  addDoc,
  onSnapshot,
  orderBy,
  limit,
  query,
  collection,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);
const messageRef = collection(db, "messages");

function Chatroom() {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    getChatRoomMsgs();
    // setLoading(false);

    const unsubscribe = onSnapshot(messageRef, (doc) => {
      getChatRoomMsgs();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getChatRoomMsgs = async () => {
    const q = query(messageRef, orderBy("createdAt", "desc"), limit(25));
    const queriedMessages = await getDocs(q).catch((err) => {
      console.log(err);
    });
    var messageList = [];

    queriedMessages.forEach((doc) => {
      // // doc.data() is never undefined for query doc snapshots
      // setMessages([...messages, doc.data()]);
      const message = { ...doc.data(), id: doc.id };
      // console.log(doc.id);
      messageList.push(message);
    });

    setMessages(messageList.reverse());
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;

    await addDoc(messageRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
    });

    setFormValue("");
  };

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          send :)
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`${messageClass}`}>
        <p> {text} </p>
      </div>
    </>
  );
}

export default Chatroom;
