import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

const Error = ({ messages }) => {
  return (
    <Alert
      status="error"
      position={"fixed"}
      bottom={"4"}
      transform={"translatex(-50%"}
      w={"full"}
    >
      <AlertIcon />
      {messages}
    </Alert>
  );
};

export default Error;
