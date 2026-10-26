import { useState } from "react";
import LoginForm from "./components/LoginForm";
import "./App.css";
import { fetchUser, loggedIn, logout } from "./apifacade";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn());
  const [userType, setUserType] = useState(localStorage.getItem("user"));
  const [fetchData, setfetchData] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  const handleFetchUser = async () => {
    const result = await fetchUser(userType ?? "");
    setfetchData(result.msg);
  };

  return (
    <main>
      {isLoggedIn && <p>logged in as {userType}</p>}
      {!isLoggedIn && (
        <LoginForm
          onLogin={() => {
            setIsLoggedIn(true);
            setUserType(localStorage.getItem("user"));
          }}
        />
      )}
      {isLoggedIn && <button onClick={handleLogout}>logout</button>}
      {isLoggedIn && <button onClick={handleFetchUser}>fetch user</button>}
      {isLoggedIn && <p>{fetchData}</p>}
    </main>
  );
}

export default App;
