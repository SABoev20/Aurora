import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../services/axiosAuthClient";
import { useSearchParams } from "react-router-dom";
function GithubOAuth() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(code);
    if (code) {
      axios
        .post("http://localhost:9090/api/oauth2/callback", {
          code,
          provider: "github",
        })
        .then(() => {
          navigate("/"); // Redirect to home page
        })
        .catch((error) => {
          console.error("Error logging in", error);
          // Handle the error appropriately
        });
    }
  }, [code]);

  return <div>Loading...</div>;
}
export default GithubOAuth;
