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
    
}