import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Col,
  Row
} from "react-bootstrap";

import ReadMoreReact from 'read-more-react';
import Auth from "../utils/auth";
import { saveProjectIds, getSavedProjectIds } from "../utils/localStorage";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_PROJECT } from "../utils/mutations";

const SearchProjects = () => {
  // create state for holding returned google api data
  const [searchedProjects, setsearchedProjects] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedProjectIds, setsavedProjectIds] = useState(getSavedProjectIds());

  const [saveProject] = useMutation(SAVE_PROJECT);

  const my_api_key = '4b8fd6d5-0376-4ea8-ace6-0d6266e22182';