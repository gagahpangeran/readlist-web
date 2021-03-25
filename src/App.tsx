import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

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
        <h1>Hello!</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
