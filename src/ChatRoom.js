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
import { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);
const messageRef = collection(db, "messages");

function Chatroom() {
  const [messages, setMessages] = useState([]); //the collection of messages
  const [formValue, setFormValue] = useState("");

  const scrollDummy = useRef();

  useEffect(() => {
    getChatRoomMsgs();

    const unsubscribe = onSnapshot(messageRef, (doc) => {
      //continuously recieve chatroom messages
      getChatRoomMsgs();
    });

    return () => {
      unsubscribe(); //detach snapshot listener when after chatroom is unrendered
    };
  }, []);

  const getChatRoomMsgs = async () => {
    const q = query(messageRef, orderBy("createdAt", "desc"), limit(25));
    const queriedMessages = await getDocs(q).catch((err) => {
      console.log(err);
    });
    var messageList = [];

    queriedMessages.forEach((doc) => {
      const message = { ...doc.data(), id: doc.id };
      messageList.push(message);
    });

    setMessages(messageList.reverse());
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (formValue !== "") {
      const { uid } = auth.currentUser;
      //add document to the messages collection
      await addDoc(messageRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
      });
      setFormValue(""); //clear form

      scrollDummy.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <div className="grid grid-rows-16 max-h-full">
      <div className="overflow-auto row-span-15 ">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={scrollDummy}></div>
      </div>

      <form onSubmit={sendMessage} className="flex row-span-1 h-10">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 border border-gray-900 focus:ring-yellow-500 focus:border-yellow-500 "
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 w-32"
        >
          send :)
        </button>
      </form>
    </div>
  );
}

function ChatMessage(props) {
  const { text, uid } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received"; //classname for sent vs recieved messages

  return (
    <>
      <div className={`${messageClass}`}>{text}</div>
    </>
  );
}

export default Chatroom;
