"use client";
import React, { useState, useEffect } from "react";
import SectionLayout from "../shared/SectionLayout";
import { Button } from "@nextui-org/react";
import { send } from "emailjs-com";
import Swal from "sweetalert2";

import { Orbitron } from "next/font/google";

import Image from "next/image";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import GoogleMap from "../shared/GoogleMap";

const orbitron = Orbitron({ subsets: ["latin"] });

const ContactSection = () => {
  const [emailForm, setEmailForm] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required!";
    }
    if (!values.country) {
      errors.country = "Phone number is required!";
    }
    if (!values.message) {
      errors.message = "Question is required!";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    // Validate the form and set errors
    const errors = validate(emailForm);
    setFormErrors(errors);

    // Check if there are any errors
    if (Object.keys(errors).length === 0) {
      send("", "", emailForm, "")
        .then((response) => {
          setLoading(false); // Stop loading
          Swal.fire({
            icon: "success",
            text: "Thank you for reaching out. Your information has been successfully submitted. Our team will respond to your inquiry shortly.",
            confirmButtonColor: "#131b2a",
          }).then(() => {
            setEmailForm({
              name: "",
              phone: "",
              email: "",
              country: "",
              message: "",
            });
          });
        })
        .catch((err) => {
          console.log("err", err);
          Swal.fire({
            icon: "error",
            text: "Something went wrong!",
          }).then(() => {
            setEmailForm({
              name: "",
              phone: "",
              email: "",
              country: "",
              message: "",
            });
            setLoading(false); // Stop loading
          });
        });
    } else {
      setLoading(false); // Stop loading
    }
  };

  return (
    <section className="pt-32 bg-black overflow-hidden">
      <div className="container py-10">
        <div className="flex flex-col justify-center text-white md:flex-row md:justify-between md:items-start gap-y-4 md:gap-y-0">
          <div className="w-[100%] md:w-[35%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <h2
                className={` text-4xl md:text-5xl text-center md:text-left ${orbitron.className}`}
              >
                Get In Touch
              </h2>
            </ScrollMotionEffect>
          </div>

          <div className="w-[100%] md:w-[55%]">
            <ScrollMotionEffect effect="fade-left" duration="2000">
              <p className="text-lg text-center md:text-left">
                {`Connect with Me Reach out for collaborations, inquiries, or
                just to chat about technology and development. I’d love to hear
                from you!`}
              </p>
            </ScrollMotionEffect>
          </div>
        </div>

        <div className="grid items-start justify-between grid-cols-1 mt-12 lg:grid-cols-3 md:gap-x-10 gap-x-0 md:mt-20">
          <div className="bg-[#181818] p-6 rounded-2xl gap-y-14">
            <ScrollMotionEffect effect="fade-up" duration="2000">
              <h2 class="text-2xl font-semibold text-white py-6 border-b-1 border-gray-400">
                Contact Details
              </h2>
              <ul class="space-y-1 text-white list-none list-inside">
                <li className="py-6 border-gray-600 border-b-1">
                  <div className="flex items-center gap-x-2">
                    <span>
                      <IoLocationSharp className="text-[#BFA46B] size-7" />
                    </span>
                    <h5 className="text-2xl font-semibold text-white">Email</h5>
                  </div>
                  <h5 className="mt-5 text-xl font-normal text-white">
                    arsahakbd@gmail.com
                  </h5>
                </li>
                <li className="py-6 border-gray-600 border-b-1">
                  <div className="flex items-center gap-x-2">
                    <span>
                      <FaPhoneAlt className="text-[#BFA46B] size-6" />
                    </span>
                    <h5 className="text-2xl font-semibold text-white">
                      Contact
                    </h5>
                  </div>
                  <h5 className="mt-5 text-xl font-normal text-white">
                    01792843207,{"   "}
                    <span className="text-[#BFA46B] ml-1">01575318540</span>
                  </h5>
                </li>
                <li className="py-6 border-gray-600 border-b-1">
                  <div className="flex items-center gap-x-2">
                    <span>
                      <IoLocationSharp className="text-[#BFA46B] size-7" />
                    </span>
                    <h5 className="text-2xl font-semibold text-white">
                      Location
                    </h5>
                  </div>
                  <h5 className="mt-2 text-xl font-normal text-white">
                    {" "}
                    Banasree, Dhaka, Bangladesh
                  </h5>
                </li>
                <li className="py-6 max-w-[700px]">
                  <GoogleMap />
                </li>
              </ul>
            </ScrollMotionEffect>
          </div>

          <div className="flex flex-col col-span-2 mt-6 md:mt-0 bg-[#181818] p-6 rounded-2xl">
            <ScrollMotionEffect effect="fade-up" duration="2000">
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center w-full gap-4 mb-6 md:flex-row">
                  <div className="w-full md:flex-1">
                    <p className="text-white ">Enter Name</p>
                    <input
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-black focus:border-black block w-full p-2.5 py-3 placeholder:text-lg pl-5 mt-3"
                      placeholder="Sadit Hasan"
                      required
                      type="text"
                      name="name"
                      value={emailForm.name}
                      onChange={(event) => {
                        setEmailForm({
                          ...emailForm,
                          name: event.target.value,
                        });
                      }}
                    />
                    <span className="text-orange-600">{formErrors.name}</span>
                  </div>
                  <div className="w-full md:flex-1">
                    <p className="text-white ">Phone</p>
                    <input
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-black focus:border-black block w-full p-2.5 py-3 placeholder:text-lg pl-5 mt-3"
                      placeholder="+1 408 XXX XXXX"
                      required
                      type="text"
                      name="phone"
                      value={emailForm.phone}
                      onChange={(event) => {
                        setEmailForm({
                          ...emailForm,
                          phone: event.target.value,
                        });
                      }}
                    />
                    <span className="text-orange-600">{formErrors.phone}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center w-full gap-4 mb-6 md:flex-row">
                  <div className="w-full md:flex-1">
                    <p className="text-white ">Enter Email</p>
                    <input
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-black focus:border-black block w-full p-2.5 py-3 placeholder:text-lg pl-5 mt-3"
                      placeholder="example@gmail.com"
                      required
                      type="email"
                      name="email"
                      value={emailForm.email}
                      onChange={(event) => {
                        setEmailForm({
                          ...emailForm,
                          email: event.target.value,
                        });
                      }}
                    />
                    <span className="text-orange-600">{formErrors.email}</span>
                  </div>
                  <div className="w-full md:flex-1">
                    <p className="text-white ">Country</p>
                    <input
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-black focus:border-black block w-full p-2.5 py-3 placeholder:text-lg pl-5 mt-3"
                      placeholder="USA"
                      required
                      type="text"
                      name="name"
                      value={emailForm.country}
                      onChange={(event) => {
                        setEmailForm({
                          ...emailForm,
                          country: event.target.value,
                        });
                      }}
                    />
                    <span className="text-orange-600">
                      {formErrors.country}
                    </span>
                  </div>
                </div>

                <div class="mb-6">
                  <p className="text-white ">
                    Brief Description of Your Project
                  </p>
                  <textarea
                    rows={10}
                    id="message"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-black focus:border-black block w-full p-2.5 py-4 placeholder:text-lg pl-5 mt-3"
                    placeholder="Write here..."
                    required
                    name="message"
                    value={emailForm.message}
                    onChange={(event) => {
                      setEmailForm({
                        ...emailForm,
                        message: event.target.value,
                      });
                    }}
                  />
                  <span className="text-orange-600">{formErrors.message}</span>
                </div>
                {loading ? (
                  <Button
                    isLoading
                    className="flex items-center justify-center px-2 py-2.5 mb-2 text-sm font-medium text-white border border-white bg-none hover:bg-primary hover:border-primary md:text-lg md:px-8 me-0 md:me-6 rounded-md bg-transparent"
                    radius="sm"
                    size="lg"
                  >
                    Sending...
                  </Button>
                ) : (
                  <Button
                    className="flex items-center justify-center px-2 py-2.5 mb-2 text-sm font-medium text-white border border-white bg-none hover:bg-primary hover:border-primary md:text-lg md:px-8 me-0 md:me-6 rounded-md bg-transparent"
                    radius="sm"
                    size="lg"
                    onClick={handleSubmit}
                  >
                    Send Message{" "}
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-2 text-white size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </Button>
                )}
              </form>
            </ScrollMotionEffect>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
