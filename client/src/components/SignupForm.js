import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {


    const [userFormData, setUserFormData] = useState({
        username: "",
        email: "",
        password: "",
      });
      // set state for form validation
      const [validated] = useState(false);
      // set state for alert
      const [showAlert, setShowAlert] = useState(false);
    
      const [addUser, { error }] = useMutation(ADD_USER);
    
      useEffect(() => {
        if (error) {
          setShowAlert(true);
        } else {
          setShowAlert(false);
        }
      }, [error]);
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
      };
    
      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        try {
          const { data } = await addUser({
            variables: { ...userFormData },
          });
          console.log(data);
          Auth.login(data.addUser.token);
        } catch (err) {
          console.error(err);
        }
    
        setUserFormData({
          username: "",
          email: "",
          password: "",
        });
      };
}