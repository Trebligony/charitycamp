import React, { useState } from "react";
import {
  Container,
  Button,
  Card
} from "react-bootstrap";
import ReadMoreReact from 'read-more-react';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ME } from "../utils/queries";
import { REMOVE_PROJECT } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeProjectId } from "../utils/localStorage";
import StripeCheckout from "react-stripe-checkout";

const SavedProjects = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeProject] = useMutation(REMOVE_PROJECT);

  const userData = data?.me || {};

  const [amount, setAmount] = useState("");
  const paymentSubmit = () => {
    alert("Thank you. Your payment has been received.");
  };
// create function that accepts the project's mong _id value as param and deletes the project from the database
const handleDeleteProject = async (pId) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false
  }
// eslint-disable-next-line
  try {
    const{data} = await removeProject({
      variables: {pId},
    });
    // upon success, remove project's id from local storage
    removeProjectId(pId);
  } catch (err) {
    console.error(err)
  }
};


};