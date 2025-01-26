import "daisyui/dist/full.css";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Oops!</h1>
          <p className="py-6">
            Something went wrong. The page you are looking for does not exist or
            an unexpected error has occurred.
          </p>
          <NavLink to="/">
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = "/")}
            >
              Go to Home
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
