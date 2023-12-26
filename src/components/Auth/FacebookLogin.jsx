import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const FacebookLogin = () => {
  const { facebookSignIn, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const isFbLoggedIn = localStorage.getItem("isFbLoggedIn");
    try {
      setLoading(true);
      const response = await facebookSignIn();

      if (
        response.providerId === "facebook.com" &&
        !currentUser?.role &&
        !isFbLoggedIn
      ) {
        setLoading(false);
        localStorage.setItem("isFbLoggedIn", true);
        navigate("/social-register");
      } else if (currentUser?.role || isFbLoggedIn) {
        setTimeout(() => {
          setLoading(false);
          Swal.fire(
            "Welcome Back!",
            "You have logged in Successfully!",
            "success"
          ).then(() => {
            navigate("/dashboard");
          });
        }, 5000);
      }
    } catch (error) {
      setLoading(false);
      console.dir(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center ">
      <button
        disabled={loading}
        onClick={handleSignIn}
        className="flex items-center justify-center bg-white  border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 -white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-full"
      >
        <svg
          className="h-6 w-6 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 48 48"
          version="1.1"
        >
          <g
            id="Icons"
            stroke="none"
            strokeWidth={1}
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Color-"
              transform="translate(-200.000000, -160.000000)"
              fill="#4460A0"
            >
              <path
                d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                id="Facebook"
              ></path>
            </g>
          </g>
        </svg>

        <span>{loading ? "Signing In.." : "Continue with Facebook"}</span>
      </button>
    </div>
  );
};

export default FacebookLogin;
