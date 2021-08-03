import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./Components/Header";
import Feeds from "./Components/Feeds";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import { AuthContext } from "./context/AuthProvider";

function App() {
  let { currentUser } = useContext(AuthContext);

  return (
    // Complete app Router me dali h toh Header hamesha rhega and Switch se wohi component load hoga jiska path match krega 
    <Router>
      <div className="App">
        <Switch>
          {currentUser ? (
            <>
              <Route path="/" component={Feeds} exact></Route>
              <Route path="/profile" component={Profile} exact></Route>
              <Redirect to="/"></Redirect>
            </>
          ) : (
            <>
              <Route path="/login" component={Login} exact></Route>
              <Route path="/signup" component={Signup} exact></Route>
              <Redirect to="/login"></Redirect>
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}

// function PrivateRoute(props) {
//   let { comp: Component, path } = props;
//   // ContextAPI ko use krne k liye ab useContext() krke context btana pdega
//   let { currentUser } = useContext(AuthContext);
//   // console.log(currentUser);
//   // Feeds ?? loggedIn and path="/"
//   // LoggedIn hoga to currentUser ki value hogi kuch and then Feeds pe ja skega wrna redirect krdega login pr kyuki null h 
//   return currentUser ? (
//     <Route path={path} component={Component}></Route>
//   ) : (
//     <Redirect to="/login"></Redirect>
//   );
// }

export default App;