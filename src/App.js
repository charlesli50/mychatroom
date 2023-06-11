// import logo from "./logo.svg";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

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
// const db = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);
  // console.log(user.displayName);

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
    // console.log("signing in!");
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
  return <div>start chattin</div>;
}

export default App;
