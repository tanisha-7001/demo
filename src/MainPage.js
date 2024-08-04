import React from "react";
import {Link} from "react-router-dom";

const MainPage = () => {
  return (
    <div className="navigation-container">
      <h1>Welcome</h1>
      <div>
        <Link to="/student-login" className="login-link">&nbsp;&nbsp;Login as Student&nbsp;</Link>
        <Link to="/admin-login" className="login-link">&nbsp;&nbsp;Login as Admin&nbsp;</Link>
      </div>
    </div>
  );
};

export default MainPage;