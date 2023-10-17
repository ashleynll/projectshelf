import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import React from "react";

export const NavBar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/auth");
    };

    return (
        <div className="nav-bar">
            <div className="logo-container">
                <img src="/images/logo.png" alt="Logo" className="logo" />
            </div>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/createProject">Create</Link>
                {!cookies.access_token ? (
                    <Link to="/auth">Login/Register</Link>
                ) : (
                    <>
                        <Link to="/saved">Saved Projects</Link>
                        <button onClick={logout} className="logout-button">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
