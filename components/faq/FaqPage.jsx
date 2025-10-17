"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import parse from "html-react-parser";
import React from "react";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";

const generalInfo = [
  {
    id: 1,
    jobTitle: "What services do you offer as a full-stack developer?",
    jobDesc: `<p>I offer comprehensive full-stack development services including custom web applications, e-commerce platforms, content management systems, RESTful API development, database design, UI/UX implementation, cloud deployment, performance optimization, and ongoing maintenance and support.</p>`,
  },
  {
    id: 2,
    jobTitle: "What is your development approach?",
    jobDesc: `<p>I follow agile methodology with clear communication at every stage. My process includes: discovery and requirements analysis, technical planning and architecture design, iterative development with regular updates, comprehensive testing (unit, integration, and user acceptance), deployment to production, and post-launch support with documentation.</p>`,
  },
  {
    id: 3,
    jobTitle: "How do you ensure code quality and maintainability?",
    jobDesc: `<p>I maintain high code quality through clean code principles, thorough code reviews, automated testing (Jest, React Testing Library), version control with Git, continuous integration/deployment pipelines, comprehensive documentation, and following industry-standard design patterns. All code is written to be scalable, secure, and easy to maintain.</p>`,
  },
  {
    id: 4,
    jobTitle: "Can you work on existing projects or join an existing team?",
    jobDesc: `<p>Absolutely! I have extensive experience joining ongoing projects at any stage. I can quickly understand existing codebases, refactor legacy code, fix bugs, add new features, improve performance, or seamlessly integrate with your in-house development team to accelerate project delivery.</p>`,
  },
];

const compatibilityInfo = [
  {
    id: 1,
    jobTitle: "What is your technology stack?",
    jobDesc: `<p><strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript, Tailwind CSS, Material-UI, Redux, Zustand<br/><strong>Backend:</strong> Node.js, Express.js, Nest.js, RESTful APIs, GraphQL<br/><strong>Databases:</strong> MongoDB, PostgreSQL, MySQL, Prisma ORM<br/><strong>Tools & DevOps:</strong> Git, Docker, AWS, Vercel, CI/CD pipelines, Jest, Postman<br/>I select the optimal tech stack based on your project requirements, scalability needs, and long-term maintenance goals.</p>`,
  },
  {
    id: 2,
    jobTitle: "Do you build responsive and mobile-first applications?",
    jobDesc: `<p>Yes! Every application I build is fully responsive and mobile-first. I ensure pixel-perfect designs across all devices and screen sizes, optimize touch interactions for mobile users, implement progressive web app (PWA) features when needed, and conduct thorough cross-browser and cross-device testing for a seamless user experience.</p>`,
  },
  {
    id: 3,
    jobTitle: "Can you integrate third-party APIs and services?",
    jobDesc: `<p>Absolutely! I have extensive experience integrating various third-party services including: payment gateways (Stripe, PayPal, Square), authentication providers (OAuth, JWT, NextAuth), social media APIs, email services (SendGrid, Nodemailer), analytics platforms (Google Analytics, Mixpanel), cloud storage (AWS S3, Cloudinary), and any custom APIs your business requires.</p>`,
  },
  {
    id: 4,
    jobTitle: "Do you implement SEO and performance optimization?",
    jobDesc: `<p>Yes! SEO and performance are core priorities in my development process. I implement server-side rendering (SSR) and static site generation (SSG) with Next.js, optimize images and assets for fast loading, implement proper meta tags and structured data, ensure semantic HTML and accessibility standards, optimize Core Web Vitals, and follow Google's best practices for search engine visibility and user experience.</p>`,
  },
];

const projectDeliveryInfo = [
  {
    id: 1,
    jobTitle: "What is the typical project timeline?",
    jobDesc: `<p>Project timelines vary based on scope and complexity. A simple landing page takes 1-2 weeks, a medium-sized web application takes 4-8 weeks, and complex full-stack platforms take 8-16+ weeks. I provide detailed project estimates during our initial consultation and maintain transparent communication throughout development with regular progress updates.</p>`,
  },
  {
    id: 2,
    jobTitle: "How do you handle project delivery and deployment?",
    jobDesc: `<p>I deliver projects through version control (Git, GitHub, GitLab, or Bitbucket) with full source code access. I handle deployment to your preferred hosting platform (Vercel, AWS, Netlify, DigitalOcean, etc.), configure CI/CD pipelines for automated deployments, provide comprehensive documentation including setup instructions and API documentation, and conduct knowledge transfer sessions to ensure your team can maintain the application.</p>`,
  },
  {
    id: 3,
    jobTitle: "What post-launch support do you provide?",
    jobDesc: `<p>I offer 30 days of free bug fixes and minor adjustments after launch. Beyond that, I'm available for ongoing maintenance contracts, feature enhancements, performance monitoring, security updates, and technical support. I believe in building long-term relationships with clients and am always available to help your project grow and evolve.</p>`,
  },
  {
    id: 4,
    jobTitle: "How do you handle communication during projects?",
    jobDesc: `<p>Clear communication is essential to project success. I provide regular progress updates (daily/weekly based on project scope), use project management tools (Jira, Trello, or Asana), schedule regular video calls or stand-ups, maintain detailed documentation, and am available via email, Slack, or your preferred communication channel. I'm typically responsive within 24 hours for urgent matters.</p>`,
  },
];

const collaborationInfo = [
  {
    id: 1,
    jobTitle: "How can I hire you for my project?",
    jobDesc: `<p>Getting started is easy! Contact me through the contact form on my website, via email, or LinkedIn with details about your project. We'll schedule a free consultation call to discuss your requirements, timeline, and budget. I'll then provide a detailed proposal with project scope, timeline, and cost breakdown. Once agreed, we'll kick off with a project contract and begin development.</p>`,
  },
  {
    id: 2,
    jobTitle: "What are your rates and payment terms?",
    jobDesc: `<p>My rates vary based on project complexity, timeline, and requirements. I offer both hourly rates and fixed-price project contracts. For hourly work, rates are competitive with industry standards. For fixed-price projects, I require a deposit (typically 30-50%) to begin work, with milestone payments throughout development and final payment upon completion. I'm flexible and can work out payment terms that suit your budget.</p>`,
  },
  {
    id: 3,
    jobTitle: "Are you available for full-time or contract positions?",
    jobDesc: `<p>Yes! I'm open to various engagement models including full-time employment, contract positions (3+ months), part-time consulting, project-based work, and retainer agreements for ongoing development. I'm flexible with remote work or hybrid arrangements. Feel free to reach out to discuss what works best for your needs.</p>`,
  },
  {
    id: 4,
    jobTitle: "Do you sign NDAs and work agreements?",
    jobDesc: `<p>Absolutely! I understand the importance of confidentiality and intellectual property protection. I'm happy to sign Non-Disclosure Agreements (NDAs), work-for-hire agreements, and any other legal documents required for your project. Your ideas and business information are always kept strictly confidential.</p>`,
  },
];

const FaqPage = () => {
  const [generalSlectedKeys, setGeneralSelectedKeys] = React.useState(
    new Set(["4"])
  );

  const [compatibilitySelectedKeys, setCompatibilitySelectedKeys] =
    React.useState(new Set(["3"]));

  const [projectDeliverySelectedKeys, setProjectDeliverySelectedKeys] =
    React.useState(new Set(["1"]));
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
              Services & Approach <span>💼</span>
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
              Technology Stack <span>⚡</span>
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
              Project & Timeline <span>📅</span>
            </h1>
            <Accordion
              selectedKeys={projectDeliverySelectedKeys}
              onSelectionChange={setProjectDeliverySelectedKeys}
              className="shadow-lg !p-5 !md:p-10 rounded-lg text-2xl py-5"
              // style={{ border: '1px solid red' }}
            >
              {projectDeliveryInfo?.map((el, index) => (
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
              Collaboration & Hiring <span>🤝</span>
            </h1>
            <Accordion className="shadow-lg !p-5 !md:p-10 rounded-lg text-2xl py-5">
              {collaborationInfo?.map((el, index) => (
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
