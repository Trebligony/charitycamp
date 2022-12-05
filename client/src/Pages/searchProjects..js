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

  // set up useEffect hook to save `savedProjectIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveProjectIds(savedProjectIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    try {
      var options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch(`https://api.globalgiving.org/api/public/services/search/projects?api_key=${my_api_key}&q=${searchInput}`, options);
      //alert(response.status);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      var sdata = await response.json();
      //console.log(sdata.search.response.projects.project[0].image.imagelink[3].url);
      //console.log(sdata.search.response.projects.project[0].goal);
      //alert('DATA');
      const searchData = sdata.search.response.projects.project;

      const projectData = searchData.map((project) => ({
        pId: project.id.toString(),
        pTitle: project.title,
        pOrganizer: project.organization.name,
        pDescription: project.summary,
        pGoal: project.goal.toString(),
        pImage: project.image.imagelink[3].url || "",
      }));

      console.log(projectData);

      setsearchedProjects(projectData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a charity to our database
  const handleSaveProject = async (pId) => {
    // find the charity in `searchedProjects` state by the matching id
    const projectToSave = searchedProjects.find((project) => project.pId === pId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // eslint-disable-next-line
      const { data } = await saveProject({
        variables: { projectData: { ...projectToSave } },
      });

      setsavedProjectIds([...savedProjectIds, projectToSave.pId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <Card fluid className="text-center mt-5">
          <Card.Body>
            <Card.Text>
              <Form onSubmit={handleFormSubmit}>
              <Row className="mt-5 mb-3">
              <Col sm={1}></Col>
              <Col sm={6}>
                  <Form.Control 
                    name="searchInput"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    size="lg"
                    placeholder="Search by Cause, Country, Location, Theme etc."
                  />
                  </Col>
                  <Col sm={3}>
                <Button  className="text-center" type="submit" variant="success" size="lg">Search for Non-Profits</Button>
                </Col>
                <Col sm={1}></Col>
                </Row>
              </Form>
            </Card.Text>
          </Card.Body>
          <Card.Footer className=" text-left"> {searchedProjects.length
            ? `Viewing ${searchedProjects.length} results:`
            : "Search for a Non-Profit to begin"}</Card.Footer>
        </Card>
      </Container>