// import logo from "./logo.svg";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
// import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  // onAuthStateChanged,
} from "firebase/auth";

import app from "./config";
import Chatroom from "./ChatRoom";
import { useEffect } from "react";

const auth = getAuth(app);
// var user = auth.currentUser;

function App() {
  // const user = auth.currentUser;
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

  useEffect(() => {
    console.log("react dev moment");
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((err) => {
      console.log("Please try again");
    });
    // user = auth.currentUser;
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

export default App;
