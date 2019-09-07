import React from "react";

export const HVCenteredLayout = ({ children }) => (
  <div className="container h-100 container-fluid h-100 d-flex flex-column">
    <div className="row h-100 justify-content-center align-items-center">
      <div className="col-10 offset-*">{children}</div>
    </div>
  </div>
);
