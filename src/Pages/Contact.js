import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed. Try again.");
      }
    } catch (error) {
      setError("An error occurred. Try again.");
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        fetchUserDetails(data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user details.");
    }
  };

  const handlePurchaseCredits = async (package_name, amount, credits, stripeToken) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/purchase-credits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ package_name, amount, credits, stripeToken }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Credits purchased successfully!");
      } else {
        setError(data.message || "Purchase failed. Try again.");
      }
    } catch (error) {
      setError("Error processing purchase.");
    }
  };
  return (
    <div>
      <main
        id="content"
        className="prose container prose-primary max-w-full dark:prose-invert bg-light"
      >
        <div
          className="relative isolate  overflow-x-clip layout-full before:backdrop-blur-xs prose-a:text-accentbg-header prose-h1:text-center dark:bg-header-dark"
          bis_skin_checked={1}
        >
          <div
            className="prose-invert relative md:pb-4 md:pt-24"
            bis_skin_checked={1}
          >
            <h1 className="text-center fw-bold">Create Account </h1>
          </div>
        </div>
        <div className="my-12 container" bis_skin_checked={1}>
          <div className="overflow-clip rounded-lg  shadow-lg" bis_skin_checked={1}>
            <div className="flex flex-wrap sm:flex-nowrap" bis_skin_checked={1}>
              <div
                className="prose prose-invert grow  p-8 sm:min-w-[360px]"
                bis_skin_checked={1}
                style={{ background: "#939393" }}
              >
                <h2 className="mt-0 text-center text-white">Get in touch</h2>
                <div className="space-y-8 text-sm text-white" bis_skin_checked={1}>
                  <div className="flex items-center" bis_skin_checked={1}>
                    <p className="sr-only">Phone number</p>
                    <svg
                      className="size-6 shrink-0 text-primary-100"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>{" "}
                    <a
                      href="tel:+1-516-927-7625"
                      className="ml-3 text-accent-50"
                      bis_skin_checked={1}
                    >
                      123-456-789
                    </a>
                  </div>

                </div>
              </div>
              <div
                className="grow p-3 px-8 shadow-md dark:bg-neutral-950"
                bis_skin_checked={1}
              >
                <div className="mx-auto max-w-lg lg:max-w-none" bis_skin_checked={1}>
                  <p>
                    Fill out the form and our team will get back to you within 24 hours. We look forward to hearing from you!
                  </p>
                  <form className="master-form">
                    <div
                      className="grid grid-cols-[--cols-default] fi-fo-component-ctn gap-6"
                      bis_skin_checked={1}
                    >
                      <div className="col-[--col-span-default]" bis_skin_checked={1}>
                        <section
                          className="fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10"
                          id="data.contact-us"
                        >
                          <header className="fi-section-header flex flex-col gap-3 px-6">
                            <div
                              className="flex items-center gap-3"
                              bis_skin_checked={1}
                            >
                              <div
                                className="grid flex-1 gap-y-1"
                                bis_skin_checked={1}
                              >
                                <h3 className="fi-section-header-heading fs-1 font-semibold leading-6 text-gray-950 dark:text-white fw-bold ">
                                  Create new Account
                                </h3>
                              </div>
                            </div>
                          </header>
                          <div
                            className="fi-section-content-ctn border-t border-gray-200 dark:border-white/10"
                            bis_skin_checked={1}
                          >
                            <div
                              className="fi-section-content p-6"
                              bis_skin_checked={1}
                            >
                              <div
                                className="grid grid-cols-[--cols-default] fi-fo-component-ctn gap-6"
                                bis_skin_checked={1}
                              >
                                <div
                                  className="col-[--col-span-default]"
                                  bis_skin_checked={1}
                                >
                                  <div data-field-wrapper="" bis_skin_checked={1}>
                                    <div
                                      className="grid gap-y-2"
                                      bis_skin_checked={1}
                                    >
                                      <div
                                        className="flex items-center gap-x-3 justify-between"
                                        bis_skin_checked={1}
                                      >
                                        <label
                                          className="fi-fo-field-wrp-label inline-flex items-center gap-x-3"
                                          htmlFor="fullName"
                                        >
                                          <span className="text-sm font-medium leading-6 text-gray-950 dark:text-white">
                                            First Name
                                            <sup className="text-danger-600 dark:text-danger-400 font-medium">
                                              *
                                            </sup>
                                          </span>
                                        </label>
                                      </div>
                                      <div
                                        className="grid auto-cols-fr gap-y-2"
                                        bis_skin_checked={1}
                                      >
                                        <input
                                          className="fi-input block w-full form-group form-control py-1.5 text-base text-gray-950"
                                          id="fullName"

                                          type="text" placeholder="First Name" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-[--col-span-default]"
                                  bis_skin_checked={1}
                                >
                                  <div data-field-wrapper="" bis_skin_checked={1}>
                                    <div
                                      className="grid gap-y-2"
                                      bis_skin_checked={1}
                                    >
                                      <div
                                        className="flex items-center gap-x-3 justify-between"
                                        bis_skin_checked={1}
                                      >
                                        <label
                                          className="fi-fo-field-wrp-label inline-flex items-center gap-x-3"
                                          htmlFor="fullName"
                                        >
                                          <span className="text-sm font-medium leading-6 text-gray-950 dark:text-white">
                                            Last Name
                                            <sup className="text-danger-600 dark:text-danger-400 font-medium">
                                              *
                                            </sup>
                                          </span>
                                        </label>
                                      </div>
                                      <div
                                        className="grid auto-cols-fr gap-y-2"
                                        bis_skin_checked={1}
                                      >
                                        <input
                                          className="fi-input block w-full form-group form-control py-1.5 text-base text-gray-950"


                                          type="text" placeholder="Last Name" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-[--col-span-default]"
                                  bis_skin_checked={1}
                                >
                                  <div data-field-wrapper="" bis_skin_checked={1}>
                                    <div
                                      className="grid gap-y-2"
                                      bis_skin_checked={1}
                                    >
                                      <div
                                        className="flex items-center gap-x-3 justify-between"
                                        bis_skin_checked={1}
                                      >
                                        <label
                                          className="fi-fo-field-wrp-label inline-flex items-center gap-x-3"
                                          htmlFor="email"
                                        >
                                          <span className="text-sm font-medium leading-6 text-gray-950 dark:text-white">
                                            Email
                                            <sup className="text-danger-600 dark:text-danger-400 font-medium">
                                              *
                                            </sup>
                                          </span>
                                        </label>
                                      </div>
                                      <div
                                        className="grid auto-cols-fr gap-y-2"
                                        bis_skin_checked={1}
                                      >
                                        <input
                                          className="fi-input block w-full form-group form-control py-1.5 text-base text-gray-950"
                                          type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-[--col-span-default]"
                                  bis_skin_checked={1}
                                >
                                  <div data-field-wrapper="" bis_skin_checked={1}>
                                    <div
                                      className="grid gap-y-2"
                                      bis_skin_checked={1}
                                    >
                                      <div
                                        className="flex items-center gap-x-3 justify-between"
                                        bis_skin_checked={1}
                                      >
                                        <label
                                          className="fi-fo-field-wrp-label inline-flex items-center gap-x-3"
                                          htmlFor="phone"
                                        >
                                          <span className="text-sm font-medium leading-6 text-gray-950 dark:text-white">
                                            Phone
                                            <sup className="text-danger-600 dark:text-danger-400 font-medium">
                                              *
                                            </sup>
                                          </span>
                                        </label>
                                      </div>
                                      <div
                                        className="grid auto-cols-fr gap-y-2"
                                        bis_skin_checked={1}
                                      >
                                        <input
                                          className="fi-input block w-full form-group form-control py-1.5 text-base text-gray-950"
                                          type="tel" placeholder="Phone Number" value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-[--col-span-default]"
                                  bis_skin_checked={1}
                                >
                                  <div data-field-wrapper="" bis_skin_checked={1}>
                                    <div
                                      className="grid gap-y-2"
                                      bis_skin_checked={1}
                                    >
                                      <div
                                        className="flex items-center gap-x-3 justify-between"
                                        bis_skin_checked={1}
                                      >
                                        <label
                                          className="fi-fo-field-wrp-label inline-flex items-center gap-x-3"
                                          htmlFor="phone"
                                        >
                                          <span className="text-sm font-medium leading-6 text-gray-950 dark:text-white">
                                            Password
                                            <sup className="text-danger-600 dark:text-danger-400 font-medium">
                                              *
                                            </sup>
                                          </span>
                                        </label>
                                      </div>
                                      <div
                                        className="grid auto-cols-fr gap-y-2"
                                        bis_skin_checked={1}
                                      >
                                        <input
                                          className="fi-input block w-full form-group form-control py-1.5 text-base text-gray-950"
                                          type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                    <button
                      className="master-form-submit-button mt-4 fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-accent gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-accent-600 text-white hover:bg-accent-500 dark:bg-accent-500 dark:hover:bg-accent-400 focus:ring-accent-500" style={{ background: "#939393" }}
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}

export default Contact