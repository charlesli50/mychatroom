// import logo from "./logo.svg";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  // onAuthStateChanged,
} from "firebase/auth";

import app from "./config";
import Chatroom from "./ChatRoom";

const auth = getAuth(app);

function App() {
  // const user = auth.currentUser;
  const [user] = useAuthState(auth);

  //TODO, remove the import useAuthState and use inbuilt auth hook instead, onAuthStateChanged
  return (
    <div className="container max-w-5xl px-24 mx-auto max-h-screen grid grid-rows-12">
      <header className="flex align-center border-gray-950 bg-davygray border-b-4 py-2 row-span-1 h-14 text-center">
        <h1 className="text-3xl font-bold ">ヽ(*⌒∇⌒*)ﾉ</h1>
        {user ? <SignOut /> : <SignIn />}
      </header>

      <section className="row-span-11 pb-1">
        {user ? <Chatroom /> : <About />}
      </section>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>This is my Anonymous Chat App, sign in with google to continue</h2>
    </div>
  );
}

function SignIn() {
  // sign in with popup
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((err) => {
      console.log("Please try again");
    });
  };

  return (
    <button
      className="bg-rosequarts ml-auto font-bold py-2 px-4 bg-lime-400 text-center"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        onClick={() => auth.signOut()}
        className="ml-auto font-bold py-2 px-4 bg-lime-400 text-center"
      >
        Sign Out :)
      </button>
    )
  );
}

export default App;
