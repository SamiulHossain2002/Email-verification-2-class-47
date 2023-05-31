import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../../Firebase/Firebase.init";

const auth = getAuth(app);

const Register = () => {
  const [errorPassword, setErrorpassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOnSubmit = (event) => {
    event.preventDefault(); // .preventDefault() = এতে করে reload হবে না.

    const form = event.target;

    const name = form?.name?.value;
    const phoneNum = form?.phone.value;

    const email = form.email.value;
    const password = form.password.value;

    // console.log(name, email, password);

    //Password validate:by password regex.
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setErrorpassword("Please provide at least two UPPERCASE");
      return; // return ব্যবহার করার কারণ fillup  না হলে সামনে এগোতে পারবে না. আবার আগে ফিরে যাবে.
    }
    if (password.length < 6) {
      setErrorpassword("Please provide at least 6 character");
      return; // return ব্যবহার করার কারণ fillup  না হলে সামনে এগোতে পারবে না. আবার আগে ফিরে যাবে.
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setErrorpassword("Please provide a special character");
    }

    //when all condition fillups then:
    setErrorpassword("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(user);
        form.reset(); //reset form..

        //verify-email:
        EmailVerification();

        //update-user:
        updateUserName(name, phoneNum);
      })
      .catch((error) => {
        console.log("error", error);
        setErrorpassword(error.message);
      });

    const EmailVerification = () => {
      sendEmailVerification(auth.currentUser).then(() => {
        alert("Please check your Email and verify your Account ");
      });
    };

    const updateUserName = (name) => {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
    };
  };

  return (
    <div className="w-50  mx-auto shadow p-5 ">
      <h4>Please Register </h4>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            placeholder="Enter Phone Number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>

        {<p className="text-danger my-2">{errorPassword}</p>}
        {success && <p className="text-success">Registration Successful</p>}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
