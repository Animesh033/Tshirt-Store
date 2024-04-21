import React from "react";
import Menu from "./Menu";
const Base = ({
  title = "My Title",
  description = "My Description",
  className = "p-4 text-white bg-dark",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid bg-dark ">
      <div className="text-center text-white jumbotron">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="mt-auto footer bg-dark py-auto">
      <div className="py-3 text-center text-white container-fluid bg-success">
        <h4>If you got any question, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact US</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
