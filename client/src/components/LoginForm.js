import React, { useSate, useEffect } from 'react';
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const LoginForm = () => {
    const [userFormData, setUserFormData] =useState({ email: "", password: ""});
    const [validation] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [login, { error }] = useMutation(LOGIN_USER);

    useEffect(() => {
        if(error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error]);

    const handleInputChange = (event) => {
        const { name, value } =event.target;
        setUserFormData({...userFormData, [name]: value });
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
          const { data } = await login({
            variables: { ...userFormData },
          });
    
          console.log(data);
          Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
        }
    
        // clear form values
        setUserFormData({
          email: "",
          password: "",
        });
      };


}