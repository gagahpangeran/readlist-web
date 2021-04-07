import React from "react";
import LoginDialog from "./LoginDialog";
import LogoutDialog from "./LogoutDialog";
import ReadListDialog from "./ReadListDialog";

export default function DialogContainer() {
  return (
    <>
      <LoginDialog />
      <LogoutDialog />
      <ReadListDialog />
    </>
  );
}
