import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../Actions/signInAction";
import { Link } from "react-router-dom";
function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.signin);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.signin);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(signInAction(email, password));
  };

  useEffect(() => {
    if (cartItems.length > 0 && userInfo) {
      props.history.push("/shipping");
    } else if (userInfo) props.history.goBack();

    return () => {};
  }, [userInfo]);

  return (
    <div className="form">
      {loading === true ? (
        <div className="sign-in-fail">
          <p>SIGN IN FAILED!</p>
        </div>
      ) : loading === false ? (
        <div className="sign-in-success">
          <p>SIGN IN SUCCESS!</p>
        </div>
      ) : (
        ""
      )}
      <div className="form-container">
        <li>
          <h3>Sign-In</h3>
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
        <button className="sign-in-btn" onClick={handleClick}>
          Sign In
        </button>
        <p>New to Amazon?</p>
        <button className="create-account-btn">
          <Link to="/register">Create Account</Link>
        </button>
      </div>
    </div>
  );
}

export default SignInScreen;
