import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../Actions/registerAction";
function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const { loading, error } = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(registerAction(name, email, password));
  };

  return (
    <div className="form">
      <form>
        {loading === false
          ? (
              <div className="sign-in-success">
                <p>SIGN UP SUCCESS!</p>
              </div>
            ) && props.history.push("/signin")
          : ""}
        {error ? (
          <div className="sign-in-fail">
            <p>Email has already existed</p>
          </div>
        ) : (
          ""
        )}
        {password !== "" && password !== rePassword ? (
          <div className="sign-up-fail">
            <p>Password must similar to Re-Enter Password!</p>
          </div>
        ) : (
          ""
        )}
        <div className="form-container">
          <li>
            <h3>Register</h3>
          </li>
          <li>
            <label>UserName:</label>
            <input onChange={(event) => setName(event.target.value)}></input>
          </li>
          <li>
            <label>Email:</label>
            <input onChange={(event) => setEmail(event.target.value)}></input>
          </li>
          <li>
            <label>Password:</label>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </li>
          <li>
            <label>Re-Enter Password:</label>
            <input
              type="password"
              onChange={(event) => setRePassword(event.target.value)}
            ></input>
          </li>
          <button className="sign-in-btn" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
