import { gql, useMutation, useQuery } from "@apollo/client";
import { apolloClient, cache } from "../apollo/client";
import { IsLogin, Login, LoginVariables } from "../types/generated-types";

export const IS_LOGIN = gql`
  query IsLogin {
    isLogin @client
  }
`;

export const LOGIN = gql`
  fragment Auth on Auth {
    token
    username
  }
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...Auth
    }
  }
`;

const writeQueryData = (isLogin: boolean) => ({
  query: IS_LOGIN,
  data: {
    isLogin
  }
});

cache.writeQuery(
  writeQueryData(
    localStorage.getItem("token") != null &&
      localStorage.getItem("username") != null
  )
);

export default function useAuth() {
  const { data, loading: queryLoading } = useQuery<IsLogin>(IS_LOGIN);

  const [login, { loading: mutationLoading }] = useMutation<
    Login,
    LoginVariables
  >(LOGIN, {
    errorPolicy: "all",
    onCompleted: async ({ login }) => {
      const { token, username } = login;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      apolloClient.writeQuery(writeQueryData(true));
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    apolloClient.writeQuery(writeQueryData(false));
  };

  return {
    isLogin: data?.isLogin ?? false,
    loading: queryLoading || mutationLoading,
    login,
    logout
  };
}
