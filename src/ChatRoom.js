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
  // const [ids, setIds] = useState([]); //the collection of messages with the UIDS, for less confusion
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
  // second useEffect for scrolling properly?
  useEffect(() => {
    scrollDummy.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [messages]);

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
    // for(var i = 0; i < 25; i++){
    //   if(messages[i])
    // }
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
    }
  };

  return (
    <div className="grid grid-rows-16 max-h-full">
      <div className="overflow-auto row-span-15 flex flex-col gap-y-0.5">
        {messages && //WHAT THE FUCK IS THIS LMFAOOOOO
          messages.map((msg, index) => (
            <>
              <div
                className={`text-xs text-slate-500 ${
                  auth.currentUser.uid === msg.uid ? "sentID" : "receivedID"
                }`}
              >
                {index > 0 &&
                  (messages[index - 1].uid === msg.uid ? (
                    <></>
                  ) : (
                    msg.uid.substring(0, 3)
                  ))}
              </div>
              <ChatMessage key={msg.id} message={msg} />
            </>
          ))}

        <div ref={scrollDummy}></div>
      </div>

      <form onSubmit={sendMessage} className="flex row-span-1 h-10">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 border-2 border-gray-900 focus:ring-emerald-700 focus:border-emerald-700 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 border-b-2 border-emerald-700 hover:border-emerald-500 w-32"
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
      {/* {previd === uid ? uid : <></>} */}
      <div className={`${messageClass} text-sm mr-3 ml-3 px-2 py-1`}>
        {text}
      </div>
    </>
  );
}

export default Chatroom;
