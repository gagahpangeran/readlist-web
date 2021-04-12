import { ApolloError } from "@apollo/client";

export function getErrorMessage(error: ApolloError) {
  const { message, networkError } = error;

  if (networkError !== null) {
    return `There is something wrong, please try again!`;
  }

  if (message === "Argument Validation Error") {
    return `Please check your input!`;
  }

  if (message.includes("Access denied")) {
    return "Please login before do the action!";
  }

  return message;
}
