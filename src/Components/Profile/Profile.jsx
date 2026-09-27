import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import ImageUploader from "../ImageUploader";

const Profile = () => {
    const navigate = useNavigate();

    let [data, setData] = useState(localStorage.getItem("accessToken"));

    let [userinfo, Setuserinfo] = useState(
        JSON.parse(localStorage.getItem("userinfo"))
    );

    const [show, setShow] = useState(false);
    const [showPro, setshowPro] = useState(false);
    const [cat, setCat] = useState("");
    const [categories, setCategories] = useState([]);
    const [images , setImages] = useState([]);
    const [upImages , setUpImages] = useState([])

    useEffect(() => {
        if (!data) {
            navigate("/login");
        }
    }, [data, navigate]);

    useEffect(() => {
        async function getCat() {
            try {
                const response = await axios.get(
                    "http://localhost:5000/get/allCategory"
                );

                console.log(response.data);
                setCategories(response.data.data || []);
            } catch (error) {
                console.log("Category fetch error:", error);
            }
        }

        getCat();
    }, []);

    const [formdata, setFormData] = useState({
        firstName: userinfo?.firstName ? userinfo.firstName : " ",
        lastName: userinfo?.lastName ? userinfo.lastName : " ",
        email: userinfo?.email ? userinfo.email : " ",
        address: userinfo?.address ? userinfo.address : " ",
    });

    const [passdata, setPassdata] = useState({
        currentPassword: " ",
        newPassword: " ",
        confirmPassword: " ",
    });

    const [Prodata, setProData] = useState({
        tittle:" " , 
        description : " ", 
        price :" " , 
        discountPrice : " " ,
        category : " ", 
        stock : " " ,
        tags : " ", 
        images: " "
    })

    const handlePassChange = (e) => {
        setPassdata({
            ...passdata,
            [e.target.name]: e.target.value,
        });
    };

    const handleCategoryUpload = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/create/category",
                {
                    name: cat,
                }
            );

            console.log("Backend Response:", response.data);

            if (response.data.success) {
                setCat("");
                setShow(false);

                const categoryResponse = await axios.get(
                    "http://localhost:5000/get/allCategory"
                );

                setCategories(categoryResponse.data.data || []);
            }
        } catch (error) {
            console.log("Category Error:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePro = (e) => {
        setProData({...Prodata,
        [e.target.name]:e.target.value})
        
    
    };

    let handleSubmitPro = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(
                'http://localhost:5000/createproduct',
                Prodata
            );
            setImages([]);
            setshowPro(false)

            console.log(response);
        } catch (error) {
            console.log("error:", error);
        }
    }

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }

        try {
            let response = await axios.post(
                `http://localhost:5000/user/${userinfo._id}`,
                formdata
            );

            localStorage.setItem(
                "userinfo",
                JSON.stringify(response.data.data)
            );

            Setuserinfo(response.data.data);
            

        } catch (error) {
            console.log("Profile update error:", error);
        }
    };

    const handlePassSubmit = async () => {
        try {
            let response = await axios.post(
                `http://localhost:5000/user/pass/${userinfo._id}`,
                passdata
            );

            console.log(response);
        } catch (error) {
            console.log("Password update error:", error);
        }
    };

    return (
        <>
            <section className="pt-20 pb-[140px]">
                <div className="container">
                    <div className="pb-20 flex justify-between">
                        <p className="font-popins font-normal text-[14px] leading-[21px] text-[rgba(0,0,0,0.5)] flex gap-4">
                            <a href="/">Home</a>
                            <span>/</span>
                            <span>My Account</span>
                        </p>

                        <p className="font-popins font-normal text-[14px] leading-[21px] text-[#000000]">
                            Welcome!
                            <span className="text-[#DB4444]">
                                {userinfo?.firstName
                                    ? userinfo.lastName
                                    : userinfo?.email}
                            </span>
                            <div className="pt[20px]"><Link to={'/product-list'}>Product List</Link></div>
                        </p>
                    </div>

                    <div className="flex gap-[100px]">
                        <div className="w-[20%]">
                            {userinfo?.role == "admin" && (
                                <div className="mb-[20px]">
                                    <h3 className="font-popins font-medium text-[16px] text-[#000000] leading-6">
                                        Admin Portion
                                    </h3>

                                    <div className="flex flex-col pt-4 ms-[35px] gap-2">
                                        <h5
                                            onClick={() => setshowPro(true)}
                                            className="cursor-pointer hover:text-[#DB4444] font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6"
                                        >
                                            Product
                                        </h5>

                                        <h5
                                            onClick={() => setShow(true)}
                                            className="cursor-pointer hover:text-[#DB4444] font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6"
                                        >
                                            Category
                                        </h5>
                                    </div>
                                </div>
                            )}

                            <div>
                                <h3 className="font-popins font-medium text-[16px] text-[#000000] leading-6">
                                    Manage My Account
                                </h3>

                                <div className="flex flex-col pt-4 ms-[35px] gap-2">
                                    <a
                                        href=""
                                        className="hover:text-[#DB4444] font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6"
                                    >
                                        My Profile
                                    </a>

                                    <a
                                        href=""
                                        className="hover:text-[#DB4444] font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6"
                                    >
                                        Address Book
                                    </a>

                                    <a
                                        href=""
                                        className="hover:text-[#DB4444] font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6"
                                    >
                                        My Payment Options
                                    </a>
                                </div>
                            </div>

                            <div className="pt-6">
                                <h3 className="font-popins font-medium text-[16px] text-[#000000] leading-6">
                                    My Orders
                                </h3>

                                <div className="flex flex-col pt-4 ms-[35px] gap-2">
                                    <a
                                        href=""
                                        className="hover:text-[#DB4444] font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6"
                                    >
                                        My Returns
                                    </a>

                                    <a
                                        href=""
                                        className="hover:text-[#DB4444] font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6"
                                    >
                                        My Cancellations
                                    </a>
                                </div>
                            </div>

                            <div className="pt-6">
                                <h3 className="font-popins font-medium text-[16px] text-[#000000] leading-6">
                                    My WishList
                                </h3>
                            </div>
                        </div>

                        <div className="w-[80%] shadow py-10 px-20 rounded-sm">
                            <h3 className="font-popins font-medium text-[#DB4444] text-xl leading-7">
                                Edit Your Profile
                            </h3>

                            <div>
                                <div className="flex gap-[50px]">
                                    <div className="w-full">
                                        <label className="font-popins font-normal text-[16px] text-[#000000] leading-6">
                                            firstName
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            name="firstName"
                                            value={formdata.firstName}
                                            type="text"
                                            className="w-full bg-[#F5F5F5] rounded-sm py-3 px-4 mt-2 font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6 outline-0"
                                            placeholder="Md"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-[50px]">
                                    <div className="w-full">
                                        <label className="font-popins font-normal text-[16px] text-[#000000] leading-6">
                                            lastName
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            name="lastName"
                                            value={formdata.lastName}
                                            type="text"
                                            className="w-full bg-[#F5F5F5] rounded-sm py-3 px-4 mt-2 font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6 outline-0"
                                            placeholder="Md"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-[50px] pt-6">
                                    <div className="w-1/2">
                                        <label className="font-popins font-normal text-[16px] text-[#000000] leading-6">
                                            Email
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            name="email"
                                            value={formdata.email}
                                            type="email"
                                            className="w-full bg-[#F5F5F5] rounded-sm py-3 px-4 mt-2 font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6 outline-0"
                                        />
                                    </div>

                                    <div className="w-1/2">
                                        <label className="font-popins font-normal text-[16px] text-[#000000] leading-6">
                                            Address
                                        </label>

                                        <input
                                            onChange={handleChange}
                                            name="address"
                                            value={formdata.address}
                                            type="text"
                                            className="w-full bg-[#F5F5F5] rounded-sm py-3 px-4 mt-2 font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6 outline-0"
                                            placeholder="Kingston, 5236, United State"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <div>
                                        <label className="font-popins font-normal text-[16px] text-[#000000] leading-6">
                                            Password Changes
                                        </label>

                                        <input
                                            name="currentPassword"
                                            type="password"
                                            onChange={handlePassChange}
                                            className="w-full bg-[#F5F5F5] rounded-sm py-3 px-4 mt-4 font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6 outline-0"
                                            placeholder="Current Password"
                                        />

                                        <input
                                            name="newPassword"
                                            onChange={handlePassChange}
                                            type="password"
                                            className="w-full bg-[#F5F5F5] rounded-sm py-3 px-4 mt-4 font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6 outline-0"
                                            placeholder="New Password"
                                        />

                                        <input
                                            name="confirmPassword"
                                            onChange={handlePassChange}
                                            type="password"
                                            className="w-full bg-[#F5F5F5] rounded-sm py-3 px-4 mt-4 font-popins font-normal text-[16px] text-[rgba(0,0,0,0.5)] leading-6 outline-0"
                                            placeholder="Confirm Password"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-7 items-center pt-10">
                                        <button
                                            type="button"
                                            onClick={handlePassSubmit}
                                            className="font-popins py-4 px-12 font-normal text-[16px] text-[#fff] rounded-sm leading-6 bg-[#DB4444]"
                                        >
                                            Update Password
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="py-4 px-12 bg-[#DB4444] text-4 leading-6 font-poppin font-medium rounded-sm text-[#fff]"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showPro && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                        <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">
                            <form
                                onSubmit={handleSubmitPro}
                                className="max-h-[80vh] overflow-y-auto p-6"
                            >
                                <div className="mb-5">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Product Title
                                    </label>

                                    <input onChange={handleChangePro}
                                        type="text"
                                        name="title"
                                        placeholder="Enter product title"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Description
                                    </label>

                                    <textarea onChange={handleChangePro}
                                        name="description"
                                        rows="4"
                                        placeholder="Enter product description"
                                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                    />
                                </div>

                                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Price
                                        </label>

                                        <input onChange={handleChangePro}
                                            type="number"
                                            name="price"
                                            placeholder="Enter price"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Discount Price
                                        </label>

                                        <input onChange={handleChangePro}
                                            type="number"
                                            name="discountPrice"
                                            placeholder="Enter discount price"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                        />
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Category
                                    </label>

                                    <select onChange={handleChangePro}
                                        name="category"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-500"
                                    >
                                        <option value="">
                                            Select Category
                                        </option>

                                        {categories.map((category) => (
                                            <option
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Stock
                                        </label>

                                        <input onChange={handleChangePro}
                                            type="number"
                                            name="stock"
                                            placeholder="Enter stock"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                        />
                                    </div>

                                    
                                </div>

                                <div className="mb-5">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Tags
                                    </label>

                                    <input onChange={handleChangePro}
                                        type="text"
                                        name="tags"
                                        placeholder="Example: phone, apple, iphone"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                    />

                                    <p className="mt-1 text-xs text-gray-500">
                                        Separate tags with commas.
                                    </p>
                                </div>

                                <div className="mb-5">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Slug
                                    </label>

                                    <input
                                        type="text"
                                        name="slug"
                                        placeholder="Example: iphone-14-pro"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Product Images
                                    </label>
                                    <ImageUploader images={images} onChange={setImages} setUpImages={setUpImages}/>
                                    {/* <input
                                        type="file"
                                        name="images"
                                        multiple
                                        accept="image/*"
                                        className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-3 text-sm"
                                    /> */}

                                    <p className="mt-1 text-xs text-gray-500">
                                        You can select multiple images.
                                    </p>
                                </div>

                                <div className="flex justify-end gap-3 border-t pt-5">
                                    <button
                                        type="button"
                                        onClick={() => setshowPro(false)}
                                        className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="rounded-lg bg-red-500 px-6 py-3 font-medium text-white hover:bg-red-600"
                                    >
                                        Create Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {show && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Create Category
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => setShow(false)}
                                    className="text-2xl text-gray-400 hover:text-gray-700"
                                >
                                    &times;
                                </button>
                            </div>

                            <form onSubmit={handleCategoryUpload}>
                                <div className="mb-5">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Category Name
                                    </label>

                                    <input
                                        type="text"
                                        value={cat}
                                        onChange={(e) =>
                                            setCat(e.target.value)
                                        }
                                        placeholder="Enter category name"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                    />
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShow(false)}
                                        className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="rounded-lg bg-red-500 px-5 py-2.5 font-medium text-white hover:bg-red-600"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default Profile;