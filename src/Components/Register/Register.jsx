import React, { useState } from "react";
import sideimg from "../../assets/images/sideimg.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        email: "",
        password: "",
        confirmpassword: "",
    });

    const [terms, setTerms] = useState(false);
    const [errors, setErrors] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors("");
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.post(
                "http://localhost:5000/registration",
                {
                    email: formdata.email,
                    password: formdata.password,
                    confirmpassword: formdata.confirmpassword,
                    terms: terms,
                }
            );

            if (!data.data.success) {
                setErrors(data.data.message);
            } else {
                setErrors("");
                navigate("/login");
            }
        } catch (error) {
            console.log("registrationError", error);

            setErrors(
    error.response?.data?.message ||
    "Something went wrong. Please try again."
);
        }
    };

    return (
        <section className="relative pt-[60px] pb-[140px]">
            <div className="w-[50%]">
                <img src={sideimg} alt="" className="w-full" />
            </div>

            <div className="absolute w-full h-full left-0 top-0">
                <div className="container h-full">
                    <div className="flex justify-end items-center h-full">
                        <div>
                            <h4 className="font-inter font-medium pb-6 text-[36px] leading-[30px] text-black">
                                Create an account
                            </h4>

                            <p className="font-poppin font-normal text-4 leading-6 text-black pb-12">
                                Enter your details below
                            </p>

                            <form onSubmit={handleClick}>
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

                                <div className="pb-10">
                                    <input
                                        name="confirmpassword"
                                        value={formdata.confirmpassword}
                                        onChange={handleChange}
                                        type="password"
                                        className="border-b border-[#808080] outline-0 w-full pb-2 font-poppin font-normal text-4 leading-6"
                                        placeholder="Confirm Password"
                                    />
                                </div>

                                <div className="pb-6">
                                    <div className="flex items-center gap-2">
                                        <input
                                            name="terms"
                                            checked={terms}
                                            onChange={(e) => setTerms(e.target.checked)}
                                            type="checkbox"
                                        />

                                        <p>Accept terms & Conditions</p>
                                    </div>
                                </div>

                                {errors && (
                                    <p className="pb-4 font-poppin text-red-500 font-normal text-4 leading-6">
                                        {errors}
                                    </p>
                                )}

                                <div className="pb-4">
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-[#DB4444] text-white rounded-[4px] text-[16px] leading-[24px] font-poppin font-medium"
                                    >
                                        Create Account
                                    </button>
                                </div>

                                <div className="pb-[34px]">
                                    <button
                                        type="button"
                                        className="w-full py-3 text-black rounded-[4px] text-[16px] leading-[24px] font-poppin font-medium border border-[#808080] flex justify-center items-center gap-4 bg-transparent"
                                    >
                                        <FcGoogle className="text-[24px]" />
                                        Sign up with Google
                                    </button>
                                </div>

                                <p className="text-center text-[16px] leading-[24px] font-poppin font-normal">
                                    Already have account?
                                    <Link
                                        to="/login"
                                        className="font-medium border-b pb-[4px] ml-4"
                                    >
                                        Log In
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;