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
    <div className="max-w-5xl sm:px-24 mx-auto max-h-screen grid grid-rows-12 px-4">
      <header className="flex align-center border-gray-950 border-b-4 py-2 row-span-1 h-14 text-center">
        <h1 className=" font-bold sm:text-3xl text-sm m-auto ml-0">
          ヽ(*⌒∇⌒*)ﾉ
        </h1>
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
    <div className="text-center mt-20 text-lg flex gap-4 flex-col">
      <h2>A small, humble, anonymous Chat Room App project, for my friends</h2>
      <p>( ˶ˆᗜˆ˵ )</p>
      <p>♡⸜(˶˃ ᵕ ˂˶)⸝♡</p>
      <p>໒꒰ྀི´ ˘ ` ꒱ྀིა</p>
      <p>( ꩜ ᯅ ꩜;)⁭ ⁭</p>
      <p>૮(˶╥︿╥)ა</p>
      <p>(_ _ ) . . z Z</p>
      <p>૮₍ ˃ ⤙ ˂ ₎ა</p>
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
      className="bg-rosequarts ml-auto my-auto font-bold py-2 px-4 bg-lime-400 text-center"
      onClick={signInWithGoogle}
    >
      Sign In :)
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        onClick={() => auth.signOut()}
        className="ml-auto font-bold py-2 px-4 bg-lime-400 text-center my-auto"
      >
        Sign Out :)
      </button>
    )
  );
}

export default App;
