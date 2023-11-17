import React from "react";

interface DialogInterface {
  children: React.ReactNode;
}

function Dialog({ children }: DialogInterface) {
  return <div className="">{children}</div>;
}

export default Dialog;
