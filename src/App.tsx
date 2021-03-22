import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import Form from "./Form";

const uri =
  process.env.NODE_ENV === "production"
    ? "/graphql"
    : "http://localhost:9000/graphql";

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Form />
      </div>
    </ApolloProvider>
  );
}

export default App;
