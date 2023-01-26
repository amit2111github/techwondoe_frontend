import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserContext } from "./context/user";
import { isSignedIn } from "./helper/localstorage";
import Signup from "./component/signup/signup";
import Watchlist from "./component/watchlist/watchlist.js";
import Signin from "./component/singin/signin";
import WatchlistForm from "./component/watchlist/WatchlistForm";
import WatchlistUpdateForm from "./component/watchlist/WatchlistUpdateForm";
const App = () => {
  const [user, setUser] = useState(() => isSignedIn());
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route exact path="/" element={<Navigate to="/signin" />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route exact path="/Watchlist" element={<Watchlist />} />
          <Route exact path="/Watchlist/create" element={<WatchlistForm />} />
          <Route
            exact
            path="/Watchlist/u/:showId"
            element={<WatchlistUpdateForm />}
          />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
