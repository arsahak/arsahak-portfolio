import React from "react";

const GoogleMap = () => {
  return (
    <div className="">
      <iframe
        className="w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1291.0099644175532!2d90.42672434230121!3d23.76421956229595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a82d72d913%3A0x9d552ae48c94f95a!2sMahir%20Villa!5e0!3m2!1sen!2sbd!4v1725457061993!5m2!1sen!2sbd"
        width="600"
        height="450"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
