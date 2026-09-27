import React, { useState } from "react";
import sideimg from "../../assets/images/sideimg.png";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value,
        });

        setErrors("");
    };

    const handleClick = async (e) => {
        e.preventDefault();

        // Blank input check
        if (!formdata.email || !formdata.password) {
            setErrors("Please enter email and password");
            return;
        }

        try {
            const data = await axios.post(
                "http://localhost:5000/login",
                {
                    email: formdata.email,
                    password: formdata.password,
                }
            );

            console.log("Login response:", data.data);

            if (!data.data.success) {
                setErrors(data.data.message);
                return;
            }

            // Correct localStorage syntax
            localStorage.setItem(
                "accessToken",
                data.data.accesstoken
            );
            localStorage.setItem(
                "userinfo",
                JSON.stringify(data.data.data)
            );

            setErrors("");

            navigate("/");
        } catch (error) {
            console.log("loginError:", error);

            setErrors(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        }
    };

    return (
        <>
            <section className="relative pt-[60px] pb-[140px]">
                <div className="w-[50%]">
                    <img
                        src={sideimg}
                        alt=""
                        className="w-full"
                    />
                </div>

                <div className="absolute w-full h-full left-0 top-0">
                    <div className="container h-full">
                        <div className="flex justify-end items-center h-full">
                            <div>
                                <h4 className="font-inter font-medium pb-6 text-[36px] leading-[30px] text-black">
                                    Log in to Exclusive
                                </h4>

                                <p className="font-poppin font-normal text-4 leading-6 text-black pb-12">
                                    Enter your details below
                                </p>

                                <div>
                                    <div className="pb-10">
                                        <input
                                            name="email"
                                            value={formdata.email}
                                            onChange={handleChange}
                                            type="email"
                                            className="border-b border-[#808080] outline-0 w-full pb-2 font-poppin font-normal text-4 leading-6"
                                            placeholder="Email or Phone Number"
                                        />
                                    </div>

                                    <div className="pb-10">
                                        <input
                                            name="password"
                                            value={formdata.password}
                                            onChange={handleChange}
                                            type="password"
                                            className="border-b border-[#808080] outline-0 w-full pb-2 font-poppin font-normal text-4 leading-6"
                                            placeholder="Password"
                                        />
                                    </div>

                                    {errors && (
                                        <p className="pb-4 font-poppin text-red-500 font-normal text-4 leading-6">
                                            {errors}
                                        </p>
                                    )}

                                    <div className="pb-4 flex flex-row gap-[87px] items-center">
                                        <button
                                            onClick={handleClick}
                                            type="button"
                                            className="px-[48px] py-4 bg-[#DB4444] text-white rounded-[4px] text-[16px] leading-[24px] font-poppin font-medium"
                                        >
                                            Login
                                        </button>

                                        <a
                                            href=""
                                            className="text-[16px] leading-[24px] font-poppin font-normal text-[#DB4444]"
                                        >
                                            Forget Password?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;