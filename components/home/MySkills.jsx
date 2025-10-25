import { Orbitron } from "next/font/google";
import ScrollMotionEffect from "../motion/ScrollMotionEffect";
import SkillLoopSlider from "../shared/SkillLoopSlider";

const orbitron = Orbitron({ subsets: ["latin"] });

const skillsInfo = [
  // Frontend Technologies
  {
    icon: "/assets/skillicon/reactjs.png",
    title: "React.js",
    category: "Frontend",
  },
  {
    icon: "/assets/skillicon/nextwhite.png",
    title: "Next.js",
    category: "Frontend",
  },
  {
    icon: "/assets/skillicon/javascript.png",
    title: "JavaScript",
    category: "Frontend",
  },
  {
    icon: "/assets/skillicon/typescript.png",
    title: "TypeScript",
    category: "Frontend",
  },
  {
    icon: "/assets/skillicon/tailwindcss.png",
    title: "Tailwind CSS",
    category: "Frontend",
  },
  {
    icon: "/assets/skillicon/html.png",
    title: "HTML5",
    category: "Frontend",
  },
  {
    icon: "/assets/skillicon/css.png",
    title: "CSS3",
    category: "Frontend",
  },
  {
    icon: "/assets/skillicon/mui.png",
    title: "Material UI",
    category: "Frontend",
  },
  {
    icon: "/assets/skillicon/bootstrap.png",
    title: "Bootstrap",
    category: "Frontend",
  },
  {
    icon: "/assets/skillicon/redux.png",
    title: "Redux",
    category: "Frontend",
  },
  {
    icon: "/assets/skillicon/framerwhite.png",
    title: "Framer Motion",
    category: "Frontend",
  },

  // Backend Technologies
  {
    icon: "/assets/skillicon/nodejs.png",
    title: "Node.js",
    category: "Backend",
  },
  {
    icon: "/assets/skillicon/js.png",
    title: "Express.js",
    category: "Backend",
  },
  {
    icon: "/assets/skillicon/python.png",
    title: "Python",
    category: "Backend",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    title: "FastAPI",
    category: "Backend",
  },
  {
    icon: "/assets/skillicon/django.png",
    title: "Django",
    category: "Backend",
  },
  {
    icon: "/assets/skillicon/restapi.png",
    title: "REST API",
    category: "Backend",
  },
  {
    icon: "/assets/skillicon/graphql.png",
    title: "GraphQL",
    category: "Backend",
  },
  {
    icon: "/assets/skillicon/apollowhite.png",
    title: "Apollo",
    category: "Backend",
  },
  {
    icon: "/assets/skillicon/websocketwhite.png",
    title: "WebSocket",
    category: "Backend",
  },

  // AI & Machine Learning
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openai/openai-original.svg",
    title: "OpenAI",
    category: "AI/ML",
  },
  {
    icon: "https://www.langchain.com/favicon.ico",
    title: "LangChain",
    category: "AI/ML",
  },
  {
    icon: "https://www.pinecone.io/favicon.ico",
    title: "Pinecone",
    category: "AI/ML",
  },
  {
    icon: "https://huggingface.co/favicon.ico",
    title: "Hugging Face",
    category: "AI/ML",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    title: "TensorFlow",
    category: "AI/ML",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    title: "PyTorch",
    category: "AI/ML",
  },

  // Database & Storage
  {
    icon: "/assets/skillicon/mongodb.png",
    title: "MongoDB",
    category: "Database",
  },
  {
    icon: "/assets/skillicon/postgresql.png",
    title: "PostgreSQL",
    category: "Database",
  },
  {
    icon: "/assets/skillicon/mysql.png",
    title: "MySQL",
    category: "Database",
  },
  {
    icon: "/assets/skillicon/prismaiconwhite.png",
    title: "Prisma ORM",
    category: "Database",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    title: "Redis",
    category: "Database",
  },

  // Cloud & DevOps
  {
    icon: "/assets/skillicon/awswhite.png",
    title: "AWS",
    category: "Cloud/DevOps",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    title: "Azure",
    category: "Cloud/DevOps",
  },
  {
    icon: "/assets/skillicon/docker.png",
    title: "Docker",
    category: "Cloud/DevOps",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    title: "Kubernetes",
    category: "Cloud/DevOps",
  },
  {
    icon: "/assets/skillicon/git.png",
    title: "Git",
    category: "Cloud/DevOps",
  },
  {
    icon: "/assets/skillicon/github.png",
    title: "GitHub",
    category: "Cloud/DevOps",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
    title: "GitHub Actions",
    category: "Cloud/DevOps",
  },

  // Tools & Design
  {
    icon: "/assets/skillicon/figma.png",
    title: "Figma",
    category: "Tools",
  },
  {
    icon: "/assets/skillicon/postman.png",
    title: "Postman",
    category: "Tools",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    title: "VS Code",
    category: "Tools",
  },
  {
    icon: "/assets/skillicon/reactnative.png",
    title: "React Native",
    category: "Mobile",
  },
];

const MySkills = () => {
  return (
    <section className="">
      <div className="container py-6 md:py-20">
        <div className="flex flex-col justify-center text-white md:flex-row md:justify-between md:items-start gap-y-4 md:gap-y-0">
          <div className="w-[100%] md:w-[35%]">
            <ScrollMotionEffect effect="fade-right" duration="2000">
              <h2
                className={` text-4xl md:text-5xl text-center md:text-left ${orbitron.className}`}
              >
                My Skills
              </h2>
            </ScrollMotionEffect>
          </div>

          <div className="w-[100%] md:w-[55%]">
            <ScrollMotionEffect effect="fade-left" duration="2000">
              <p className="text-lg text-center md:text-left">
                {`Mastering modern web development with React.js & Next.js, building robust APIs with Node.js & FastAPI, and integrating cutting-edge AI technologies like LangChain, Pinecone, and OpenAI to create intelligent, production-ready applications.`}
              </p>
            </ScrollMotionEffect>
          </div>
        </div>
        <div className="mt-16">
          <SkillLoopSlider skillsInfo={skillsInfo} />
        </div>
      </div>
    </section>
  );
};

export default MySkills;
