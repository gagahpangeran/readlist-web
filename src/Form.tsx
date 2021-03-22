import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { GetName, ChangeName, ChangeNameVariables } from "./generated-types";
import "./Form.css";

const GET_NAME = gql`
  query GetName {
    name
  }
`;

const CHANGE_NAME = gql`
  mutation ChangeName($name: String!) {
    changeName(name: $name)
  }
`;

const getData = (loading: boolean, data?: GetName) => {
  if (loading || data === undefined) {
    return "...";
  }

  return data.name;
};

function Form() {
  const [name, setName] = useState("");

  const { data, loading: queryLoading, refetch } = useQuery<GetName>(GET_NAME, {
    fetchPolicy: "network-only"
  });

  const [changeName, { loading: mutationLoading }] = useMutation<
    ChangeName,
    ChangeNameVariables
  >(CHANGE_NAME, { variables: { name } });

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    await changeName();
    await refetch();
  };

  return (
    <div className="form" onSubmit={handleSubmit}>
      <h1>{`Hello, ${getData(queryLoading || mutationLoading, data)}!`}</h1>
      <form>
        <input
          type="text"
          placeholder="enter your name"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
