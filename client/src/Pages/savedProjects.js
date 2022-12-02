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
}