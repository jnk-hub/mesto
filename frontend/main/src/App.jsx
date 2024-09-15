import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

import { checkToken } from "./utils/auth.js";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

import "./index.css";

const Register = React.lazy(() => import('auth/Register'));
const Login = React.lazy(() => import('auth/Login'));

const App = () => {
  const [jwt, setJWT] = React.useState("")
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/signin");
  }

  React.useEffect(() => {
    const handleReg = _ => {
      history.push("/signin");
    }
    addEventListener("reg", handleReg);
    return () => removeEventListener("reg", handleReg)
  }, []);
  React.useEffect(() => {
    const handleUserChange = event => {
      setJWT(event.detail)
      history.push("/");
    }
    addEventListener("jwt-change", handleUserChange);
    return () => removeEventListener("jwt-change", handleUserChange)
  }, []);
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) { setJWT(token) }
  }, [history]);
  React.useEffect(() => {
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [jwt])

  return (
    <div className="page__content">
      <Header email={email} onSignOut={onSignOut} />
      <Switch>
        <ProtectedRoute exact path="/" component={Main} loggedIn={isLoggedIn} />
        <Route path="/signup">
          <React.Suspense>
            <Register />
          </React.Suspense>
        </Route>
        <Route path="/signin">
          <React.Suspense>
            <Login />
          </React.Suspense>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<BrowserRouter><App /></BrowserRouter>)