import React from "react";
import { useState, useEffect } from "react";
import Login from "./frontend/Router.js";
import { AuthProvider } from "./context.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./backend/firebase";
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthProvider value={{ currentUser }}>
      <div className="container">
        <Login />
      </div>
    </AuthProvider>
  );
}

export default App;
