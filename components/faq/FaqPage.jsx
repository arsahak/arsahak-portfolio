"use client";
import React from "react";
import parse from "html-react-parser";
import { Accordion, AccordionItem } from "@nextui-org/react";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

const generalInfo = [
  {
    id: 1,
    jobTitle: "Not working on iPhone?",
    jobDesc: `<p>Absolutely! Email us at b2b@SWOPME.co to start a conversation with us! 📈</p>
    <p>No! The other person does not need a SWOP or app to receive your SWOP profile. That's the beauty of SWOP ⚡</p>
    <p>If their phone is on this list of compatible devices you can pop to their phone. If it is not, just use your SWOP 
    QR code on your profile to share!</p>`,
  },
  {
    id: 2,
    jobTitle: "Not working on Android?",
    jobDesc: `<p>Absolutely! Email us at b2b@SWOPME.co to start a conversation with us! 📈</p>
    <p>No! The other person does not need a SWOP or app to receive your SWOP profile. That's the beauty of SWOP ⚡</p>
    <p>If their phone is on this list of compatible devices you can pop to their phone. If it is not, just use your SWOP 
    QR code on your profile to share!</p>`,
  },
  {
    id: 3,
    jobTitle: "What is SWOP?",
    jobDesc: `<p>Absolutely! Email us at b2b@SWOPME.co to start a conversation with us! 📈</p>
    <p>No! The other person does not need a SWOP or app to receive your SWOP profile. That's the beauty of SWOP ⚡</p>
    <p>If their phone is on this list of compatible devices you can pop to their phone. If it is not, just use your SWOP 
    QR code on your profile to share!</p>`,
  },
  {
    id: 4,
    jobTitle: "Can i order custom SWOP?",
    jobDesc: `<p>Absolutely! Email us at b2b@SWOPME.co to start a conversation with us! 📈</p>
    <p>No! The other person does not need a SWOP or app to receive your SWOP profile. That's the beauty of SWOP ⚡</p>
    <p>If their phone is on this list of compatible devices you can pop to their phone. If it is not, just use your SWOP 
    QR code on your profile to share!</p>
`,
  },
];

const compatibilityInfo = [
  {
    id: 1,
    jobTitle: "Compatibility Phones",
    jobDesc: `<p>Absolutely! Email us at b2b@SWOPME.co to start a conversation with us! 📈</p>
    <p>No! The other person does not need a SWOP or app to receive your SWOP profile. That's the beauty of SWOP ⚡</p>
    <p>If their phone is on this list of compatible devices you can pop to their phone. If it is not, just use your SWOP 
    QR code on your profile to share!</p>`,
  },
  {
    id: 2,
    jobTitle: "Will my SWOP work under my phone case?",
    jobDesc: `<p>Absolutely! Email us at b2b@SWOPME.co to start a conversation with us! 📈</p>
    <p>No! The other person does not need a SWOP or app to receive your SWOP profile. That's the beauty of SWOP ⚡</p>
    <p>If their phone is on this list of compatible devices you can pop to their phone. If it is not, just use your SWOP 
    QR code on your profile to share!</p>`,
  },
  {
    id: 3,
    jobTitle: "How to turn NFC on for an Android? ",
    jobDesc: `<p>Yes! SWOP will work through 99.9% of phone cases, including ones that hold credit cards. The only exception would be if your case has a layer of metal.</p>
   `,
  },
  {
    id: 4,
    jobTitle: "How can i get verified on SWOP? ",
    jobDesc: `<p>Absolutely! Email us at b2b@SWOPME.co to start a conversation with us! 📈</p>
    <p>No! The other person does not need a SWOP or app to receive your SWOP profile. That's the beauty of SWOP ⚡</p>
    <p>If their phone is on this list of compatible devices you can pop to their phone. If it is not, just use your SWOP 
    QR code on your profile to share!</p>
`,
  },
];

const sahippingInfo = [
  {
    id: 1,
    jobTitle: "Do you ship worldwide?",
    jobDesc: `<p>Absolutely! Email us at b2b@SWOPME.co to start a conversation with us! 📈</p>
    <p>No! The other person does not need a SWOP or app to receive your SWOP profile. That's the beauty of SWOP ⚡</p>
    <p>If their phone is on this list of compatible devices you can pop to their phone. If it is not, just use your SWOP 
    QR code on your profile to share!</p>`,
  },
  {
    id: 2,
    jobTitle: "Will my SWOP work under my phone case?",
    jobDesc: `<p>Absolutely! Email us at b2b@SWOPME.co to start a conversation with us! 📈</p>
    <p>No! The other person does not need a SWOP or app to receive your SWOP profile. That's the beauty of SWOP ⚡</p>
    <p>If their phone is on this list of compatible devices you can pop to their phone. If it is not, just use your SWOP 
    QR code on your profile to share!</p>`,
  },
  {
    id: 3,
    jobTitle: "How to turn NFC on for an Android? ",
    jobDesc: `<p>Yes! SWOP will work through 99.9% of phone cases, including ones that hold credit cards. The only exception would be if your case has a layer of metal.</p>
   `,
  },
  {
    id: 4,
    jobTitle: "How can i get verified on SWOP? ",
    jobDesc: `<p>Absolutely! Email us at b2b@SWOPME.co to start a conversation with us! 📈</p>
    <p>No! The other person does not need a SWOP or app to receive your SWOP profile. That's the beauty of SWOP ⚡</p>
    <p>If their phone is on this list of compatible devices you can pop to their phone. If it is not, just use your SWOP 
    QR code on your profile to share!</p>
`,
  },
];

const FaqPage = () => {
  const [generalSlectedKeys, setGeneralSelectedKeys] = React.useState(
    new Set(["4"])
  );

  const [compatibilitySelectedKeys, setCompatibilitySelectedKeys] =
    React.useState(new Set(["3"]));

  const [sahippingSlectedKeys, setShippingSelectedKeys] = React.useState(
    new Set(["0"])
  );
  return (
    <div className="container py-20">
      <ScrollMotionEffect effect="fade-up" duration="2000">
        <div className="bg-[#F3F3F3] flex flex-col md:flex-row items-center justify-center gap-4 p-4 rounded-md mx-auto md:w-[750px] text-md md:text-lg font-semibold ">
          <p>{`Sign up for text and support`}</p>
          <span className="hidden md:block">|</span>
          <p>{`Text ‘SWOP’ to 67839`}</p>
          <span className="hidden md:block">|</span>
          <p>{`Email us: support@swopme.co`}</p>
        </div>
      </ScrollMotionEffect>

      <ScrollMotionEffect effect="fade-up" duration="2000">
        <h2
          className={`text-white font-normal text-xl md:text-4xl text-center !leading-none mt-6`}
        >
          <strong>How Can We Help?</strong>
        </h2>
      </ScrollMotionEffect>

      <ScrollMotionEffect effect="fade-up" duration="2000">
        <p className="text-lg text-white text-center mt-4 max-w-[620px] mx-auto px-6 md:px-0">
          Discover rewarding career paths, innovative work environments, and the
          chance to grow with us. Find your perfect job and start making an
          impact today.
        </p>
      </ScrollMotionEffect>

      <ScrollMotionEffect effect="fade-up" duration="2000">
        <div className="mx-6 md:mx-32 mt-8 md:mt-16 bg-white overflow-x-hidden">
          <Accordion
            className="border-2 shadow-lg !p-5 !md:p-10 rounded-lg text-2xl py-5 overflow-x-hidden"
            // style={{ border: '1px solid red' }}
          >
            <AccordionItem
              aria-label="Accordion 1"
              title={
                <strong className="text-white text-xl md:text-2xl font-bold">
                  Troubleshooting SWOP
                </strong>
              }
              className="text-[18px] md:text-lg "
            >
              {`We warmly welcome you to SWOP, when you come to SWOP, For Near-field
            Communication Related Process and functions, we collect your
            information. We value your trust, we own our responsibility to
            retain, preserve and protect your data as per Cyber Laws
            recommendations and we know how to safeguard our valued customer's
            (“USERS”) information.`}
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollMotionEffect>

      <ScrollMotionEffect effect="fade-up" duration="2000">
        <div className="mx-6 md:mx-32 mt-8 md:mt-16 border-2 shadow-lg rounded-lg bg-white">
          <h1 className="text-2xl font-bold ml-1 !px-5 !md:px-10 mt-6">
            General <span>💎</span>
          </h1>
          <Accordion
            selectedKeys={generalSlectedKeys}
            onSelectionChange={setGeneralSelectedKeys}
            className="shadow-lg !p-5 !md:p-10 rounded-lg text-2xl py-5"
            // style={{ border: '1px solid red' }}
          >
            {generalInfo?.map((el, index) => (
              <AccordionItem
                key={el.id}
                aria-label="Accordion 1"
                title={
                  <div className="text-xl md:text-[22px] font-medium">
                    {el.jobTitle}
                  </div>
                }
                className="text-[18px] md:text-lg "
              >
                {parse(el.jobDesc)}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollMotionEffect>

      <ScrollMotionEffect effect="fade-up" duration="2000">
        <div className="mx-6 md:mx-32 mt-8 md:mt-16 border-2 shadow-lg rounded-lg bg-white">
          <h1 className="text-2xl font-bold ml-1 !px-5 !md:px-10 mt-6">
            Compatibility <span>🤝</span>
          </h1>
          <Accordion
            selectedKeys={compatibilitySelectedKeys}
            onSelectionChange={setCompatibilitySelectedKeys}
            className="shadow-lg !p-5 !md:p-10 rounded-lg text-2xl py-5"
            // style={{ border: '1px solid red' }}
          >
            {compatibilityInfo?.map((el, index) => (
              <AccordionItem
                key={el.id}
                aria-label="Accordion 1"
                title={
                  <div className="text-xl md:text-[22px] font-medium">
                    {el.jobTitle}
                  </div>
                }
                className="text-[18px] md:text-lg "
              >
                {parse(el.jobDesc)}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollMotionEffect>

      <ScrollMotionEffect effect="fade-up" duration="2000">
        <div className="mx-6 md:mx-32 mt-8 md:mt-16 border-2 shadow-lg rounded-lg bg-white">
          <h1 className="text-2xl font-bold ml-1 !px-5 !md:px-10 mt-6">
            Shipping <span>🚚</span>
          </h1>
          <Accordion
            selectedKeys={sahippingSlectedKeys}
            onSelectionChange={setShippingSelectedKeys}
            className="shadow-lg !p-5 !md:p-10 rounded-lg text-2xl py-5"
            // style={{ border: '1px solid red' }}
          >
            {sahippingInfo?.map((el, index) => (
              <AccordionItem
                key={el.id}
                aria-label="Accordion 1"
                title={
                  <div className="text-xl md:text-[22px] font-medium">
                    {el.jobTitle}
                  </div>
                }
                className="text-[18px] md:text-lg "
              >
                {parse(el.jobDesc)}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollMotionEffect>
    </div>
  );
};

export default FaqPage;
