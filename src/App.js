// import logo from "./logo.svg";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  // onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  serverTimestamp,
  // setDoc,
  addDoc,
  onSnapshot,
  orderBy,
  limit,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKAL5lP68e3fFRMmDURDp524OveyOs5C8",
  authDomain: "myanonchatapp.firebaseapp.com",
  projectId: "myanonchatapp",
  storageBucket: "myanonchatapp.appspot.com",
  messagingSenderId: "722335773628",
  appId: "1:722335773628:web:7e5912b90aac540ac371b9",
  measurementId: "G-GXZ0W1MESN",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messageRef = collection(db, "messages");

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="text-3xl font-bold underline">
        Welcome to my anonymous Chat app
        <SignOut></SignOut>
      </header>

      <section>{user ? <Chatroom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  // sign in with popup
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function Chatroom() {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    getChatRoomMsgs();

    onSnapshot(messageRef, (doc) => {
      getChatRoomMsgs();
    });
  }, []);

  const getChatRoomMsgs = async () => {
    const q = query(messageRef, orderBy("createdAt", "desc"), limit(25));
    const queriedMessages = await getDocs(q);
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

export default App;
