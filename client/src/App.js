import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchProjects from "./pages/SearchProjects";
import SavedProjects from "./pages/SavedProjects";
import RecomendProjects from "./pages/RecomendProjects";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchProjects} />
            <Route exact path="/recommend" component={RecomendProjects} />
            <Route exact path="/saved" component={SavedProjects} />
            <Route render={() => <h1 className="display-2">404: Page not found</h1>} />
          </Switch>
          <Footer/>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
