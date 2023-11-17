import React from "react";

interface DialogInterface {
  children: React.ReactNode;
  opened: boolean;
  setOpened: (value: boolean) => void;
}

function Dialog({ children, opened, setOpened }: DialogInterface) {
  function closeDialog() {
    setOpened(false);
  }

  if (opened)
    return (
      <div className="bg-lb2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 p-10 rounded-md min-w-[700px] min-h-[500px] shadow-focused">
        <button onClick={closeDialog} className="absolute top-3 right-5">
          <span className="text-2xl font-bold">X</span>
        </button>
        <div className="h-[calc(100vh-200px)] overflow-y-auto">{children}</div>
      </div>
    );
}

export default Dialog;
