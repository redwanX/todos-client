import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/todos");
    }
  }, [user]);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div
      style={{ minHeight: "calc(100vh - 74px)" }}
      className="secondery-bg d-flex flex-column justify-content-center align-items-center"
    >
      <h1 className="fw-bold text-center primary-text">Hello User!</h1>
      <p className=" fw-bold text-center secondery-text">
        You Need To login To Use This WebApp!
      </p>
      <Link to="/login">
        <button className="btn rounded-pill px-5 btn-dark">Login</button>
      </Link>
    </div>
  );
};

export default Home;
