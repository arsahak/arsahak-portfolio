"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import parse from "html-react-parser";
import React from "react";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

const generalInfo = [
  {
    id: 1,
    jobTitle: "What services do you offer?",
    jobDesc: `<p>I offer full-stack web development, UI/UX design, API integration, and performance optimization. I specialize in React, Next.js, Node.js, and modern web technologies.</p>`,
  },
  {
    id: 2,
    jobTitle: "What is your development process?",
    jobDesc: `<p>My process includes requirements gathering, wireframing, design, agile development, testing, and deployment. I keep clients updated at every stage for transparency and quality.</p>`,
  },
  {
    id: 3,
    jobTitle: "How do you ensure code quality?",
    jobDesc: `<p>I use code reviews, automated testing, and best practices for maintainable, scalable, and secure code. I also provide documentation and post-launch support.</p>`,
  },
  {
    id: 4,
    jobTitle: "Can you work with existing projects or teams?",
    jobDesc: `<p>Absolutely! I can join ongoing projects, refactor legacy code, or collaborate with your in-house team to deliver results efficiently.</p>`,
  },
];

const compatibilityInfo = [
  {
    id: 1,
    jobTitle: "What technologies do you use?",
    jobDesc: `<p>I work with React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, and more. I choose the best stack for your project's needs.</p>`,
  },
  {
    id: 2,
    jobTitle: "Do you build responsive/mobile-friendly websites?",
    jobDesc: `<p>Yes! All my projects are fully responsive and optimized for all devices, ensuring a seamless user experience everywhere.</p>`,
  },
  {
    id: 3,
    jobTitle: "Can you integrate third-party APIs or services?",
    jobDesc: `<p>Yes, I have experience integrating payment gateways, social logins, analytics, and other third-party APIs to extend your site's functionality.</p>`,
  },
  {
    id: 4,
    jobTitle: "Do you provide SEO optimization?",
    jobDesc: `<p>Yes, I follow SEO best practices for structure, performance, and accessibility to help your site rank better in search engines.</p>`,
  },
];

const sahippingInfo = [
  {
    id: 1,
    jobTitle: "How do you handle project delivery?",
    jobDesc: `<p>I deliver projects via GitHub, GitLab, or your preferred platform. I also provide deployment support and handover documentation.</p>`,
  },
  {
    id: 2,
    jobTitle: "What is your support policy after launch?",
    jobDesc: `<p>I offer free bug fixes for an agreed period after launch and am available for ongoing maintenance or feature updates as needed.</p>`,
  },
  {
    id: 3,
    jobTitle: "How can I contact you for support or new work?",
    jobDesc: `<p>You can reach me via email, LinkedIn, or the contact form on my website. I respond promptly to all client inquiries.</p>`,
  },
  {
    id: 4,
    jobTitle: "What are your payment terms?",
    jobDesc: `<p>Typically, I require a deposit to start, with the balance due upon completion. For larger projects, milestone payments can be arranged.</p>`,
  },
];

const accountInfo = [
  {
    id: 1,
    jobTitle: "How do I create an account?",
    jobDesc: `<p>You can create an account by clicking the Sign Up button on the homepage and filling out the registration form with your details.</p>`,
  },
  {
    id: 2,
    jobTitle: "How do I reset my password?",
    jobDesc: `<p>Click on 'Forgot Password' on the login page and follow the instructions to reset your password via email.</p>`,
  },
  {
    id: 3,
    jobTitle: "Can I update my profile information?",
    jobDesc: `<p>Yes, you can update your profile information anytime from your account dashboard after logging in.</p>`,
  },
  {
    id: 4,
    jobTitle: "How do I delete my account?",
    jobDesc: `<p>If you wish to delete your account, please contact me directly and I will assist you with the process.</p>`,
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
    <div className="min-h-screen bg-[#181818] py-20 mt-16">
      <div className="container  mx-auto px-4">
        <ScrollMotionEffect effect="fade-up" duration="2000">
          <h2
            className={`text-white font-normal text-xl md:text-4xl text-center !leading-none mt-6`}
          >
            <strong>Frequently Asked Questions</strong>
          </h2>
        </ScrollMotionEffect>
        <ScrollMotionEffect effect="fade-up" duration="2000">
          <p className="text-lg text-white text-center mt-4 max-w-[620px] mx-auto px-6 md:px-0">
            Answers to common questions about my web development services,
            process, and support. If you have more questions, feel free to
            contact me directly.
          </p>
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
        <ScrollMotionEffect effect="fade-up" duration="2000">
          <div className="mx-6 md:mx-32 mt-8 md:mt-16 border-2 shadow-lg rounded-lg bg-white">
            <h1 className="text-2xl font-bold ml-1 !px-5 !md:px-10 mt-6">
              Account <span>👤</span>
            </h1>
            <Accordion className="shadow-lg !p-5 !md:p-10 rounded-lg text-2xl py-5">
              {accountInfo?.map((el, index) => (
                <AccordionItem
                  key={el.id}
                  aria-label="Accordion 1"
                  title={
                    <div className="text-xl md:text-[22px] font-medium">
                      {el.jobTitle}
                    </div>
                  }
                  className="text-[18px] md:text-lg"
                >
                  {parse(el.jobDesc)}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollMotionEffect>
      </div>
    </div>
  );
};

export default FaqPage;
