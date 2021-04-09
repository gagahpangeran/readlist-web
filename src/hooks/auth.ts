import { makeVar, useMutation, useReactiveVar } from "@apollo/client";
import { apolloClient } from "../apollo/client";
import { LOGIN } from "../gql/auth.gql";
import { Login, LoginVariables } from "../types/generated-types";

const isLoginVar = makeVar(
  localStorage.getItem("token") !== null &&
    localStorage.getItem("username") !== null
);

export function useAuth() {
  const [login, { loading }] = useMutation<Login, LoginVariables>(LOGIN, {
    errorPolicy: "all",
    onCompleted: ({ login }) => {
      const { token, username } = login;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      isLoginVar(true);
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    isLoginVar(false);
    apolloClient.resetStore();
  };

  return {
    isLogin: useReactiveVar(isLoginVar),
    loading,
    login,
    logout
  };
}
