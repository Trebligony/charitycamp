import React, { useState, useEffect } from "react";
import {
    Container,
    Button, 
    Card
} from "react-bootstrap";

import ReadMoreReact from 'read-more-react';
import Auth from "../utils/auth";
import { saveProjectIds, getSavedProjectIds } from "../utils/localStorage";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_PROJECT } from "../utils/mutations";

const RecomendedProjects = () => {
    // create state for holding returned google api data
    const [searchedProjects, setsearchedProjects] = useState([]);

    // create state to hold saved bookId values
    const [savedProjectIds, setsavedProjectIds] = useState(getSavedProjectIds());

    const [saveProject] = useMutation(SAVE_PROJECT);

    const my_api_key = '4b8fd6d5-0376-4ea8-ace6-0d6266e22182';

    // set up useEffect hook to save `savedProjectIds` list to localStorage on component unmount
    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    useEffect(() => {
        return () => saveProjectIds(savedProjectIds);
    });

    //async function getapi(url) {
    async function getData() {
        try {
            var options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

            const response = await fetch(`https://api.globalgiving.org/api/public/projectservice/featured/projects?api_key=${my_api_key}`, options);
            //alert(response.status);
            if (!response.ok) {
                throw new Error("something went wrong!");
            }
            var sdata = await response.json();
            //console.log(sdata.search.response.projects.project[0].image.imagelink[3].url);
            //console.log(sdata.search.response.projects.project[0].goal);
            //alert('DATA');
            const searchData = sdata.projects.project;

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
        } catch (err) {
            console.error(err);
        }

    };

    getData();

    // create function to handle saving a book to our database
    const handleSaveProject = async (pId) => {
        // find the book in `searchedProjects` state by the matching id
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
                        <Card.Title>
                            <h1>Viewing Top-10 Recommended Non-Profits</h1>
                        </Card.Title>
                        <Card.Text>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className=" text-left">
                        {searchedProjects.length
                            ? `Viewing Top ${searchedProjects.length} results:`
                            : "Search for a Non-Profit to begin"
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container>
                {searchedProjects.map((project) => {
                    return (
                        <div class="card">
                            <div class="row ">
                                <div class="col-md-9 px-3">
                                    <div class="card-block px-6">
                                        <h4 class="card-title">{project.pTitle}</h4><hr />
                                        <h6 class="card-title">Funding Goal: <b>${project.pGoal}</b></h6>
                                        <h6 class="card-title">Organizer: <b>{project.pOrganizer}</b></h6><hr />
                                        <ReadMoreReact class="card-text"
                                            min={100}
                                            ideal={150}
                                            max={200}
                                            text={project.pDescription}
                                            readMoreText="READ MORE"
                                        /><hr />
                                        {Auth.loggedIn() && (
                                            <Button
                                                disabled={savedProjectIds?.some(
                                                    (savedProjectId) => savedProjectId === project.pId
                                                )}
                                                className="mt-auto btn btn-primary"
                                                onClick={() => handleSaveProject(project.pId)}
                                            >
                                                {savedProjectIds?.some(
                                                    (savedProjectId) => savedProjectId === project.pId
                                                )
                                                    ? "This Non-Profit has already been saved"
                                                    : "Save this Non-Profit"}
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    {project.pImage ? (
                                        <img class="promage d-block rounded" width="400" height="400" src={project.pImage} alt={`The cover for ${project.pTitle}`} />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Container>
        </>
    );
};

export default RecomendedProjects;
