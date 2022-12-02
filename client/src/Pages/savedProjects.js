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

return (
  <>
    <Container>
      <Card fluid className="text-center mt-5">
        <Card.Body>
          <Card.Title>
            <h1>Viewing <b>{userData.username}</b>'s saved Non-Profits</h1>
            </Card.Title>
              <Card.Text>

              </Card.Text>
          </Card.Body>
          <Card.Footer className="text-left">
            {userData.savedProjects?.length
              ?`Viewing ${userData.savedProjects.length} saved ${userData.savedProjects.length === 1 ?"Non-Profit" : "Non-Profits"
            }:`
            : "You have no saved Non-Profits"}
          </Card.Footer>
      </Card>
      </Container>
            
      <Container>
        {userData.savedProjects?.map((project) => {
          return (
            <div class="card">
              <div class="row ">
                <div class="col-md-9 px-3">
                  <div class="card-block px-6">
                    <h4 class="card-title">{project.pTitle}</h4><hr />
                    <h6 class="card-title">Funding Goal: <b>${project.pGoal}</b></h6>
                    <h6 class="card-title">Organizer: <b>{project.pOrganizer}</b></h6>

                    {Auth.loggedIn() && (
                      <div class="form-inline form-group mb-2 mt-1">
                        <input class="form-control mr-2" type="number" placeholder="Amount in ($)" onChange={e => setAmount(e.target.value)}></input>

                        <StripeCheckout
                          // When testing strip use 42 repeated as the cardnumber 1234 as the date and any three numbers for the CVC code
                          stripeKey="pk_test_51Lnfr8DtrcvUZdbsTtFicrkM0CiNXiY740tuEHWMB71DneFjjNgSmXcq3K4tg2i0oJTtthHjpjY6tznkgB8imIol001yUluJj3"
                          name="Non-Profit Funding"
                          description="Payment via Stripe"
                          panelLabel="Pay "
                          currency="USD"
                          amount={amount * 100}
                          token={paymentSubmit}
                        >

                          <button class="stripe-nav btn btn-outline-success">
                            FUND NOW
                          </button>
                        </StripeCheckout>
                      </div>
                    )}
                    <hr />
                    <ReadMoreReact class="card-text" 
                     min={100}
                     ideal={150}
                     max={200}
                     text={project.pDescription} 
                     readMoreText="READ MORE"
                     /><hr />
                    {Auth.loggedIn() && (
                      <Button
                        className="mt-auto btn btn-danger"
                        onClick={() => handleDeleteProject(project.pId)}
                      >
                        Delete this Non-Profit
                      </Button>
                    )}

                  </div>
                </div>

                <div class="col-md-3">
                  {project.pImage ? (
                    <img class="promage d-block rounded" src={project.pImage} alt={`The cover for ${project.pTitle}`} />
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

export default SavedProjects;