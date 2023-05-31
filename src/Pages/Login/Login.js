import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import app from "../../Firebase/Firebase.init";

const auth = getAuth(app);

const Login = () => {
  const [success, setSuccess] = useState(false);

  const [userEmail, setUserEmail] = useState("");

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(user);
        form.reset(); //reset form..
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    //SAmiul114212
  };

  const handleOnBlur = (event) => {
    const email = event.target.value;
    setUserEmail(email);
    console.log(email);
  };

  const handleForgetPassword = () => {
    if (!userEmail) {
      alert("Please enter your valid email");
      return;
    }
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        alert(`Please check your ${userEmail} ,and Reset Password link sent`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-50  mx-auto shadow p-5 ">
      <h4>Please Login </h4>
      <form onSubmit={handleLoginSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleOnBlur}
            type="email"
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>

        {success && <p className="text-success">Login Successful</p>}
        <Button variant="primary" type="submit">
          Login
        </Button>
        <p>
          <small>
            Forget Password?{" "}
            <button onClick={handleForgetPassword} className="btn btn-link">
              Reset Password
            </button>
          </small>
        </p>
      </form>
    </div>
  );
};

export default Login;
