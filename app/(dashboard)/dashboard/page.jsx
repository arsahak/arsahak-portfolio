"use client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const USER_EMAIL = "admin@arsahak.com";
const USER_PASS = "87537799Ar@";

const navItems = [
  { label: "Dashboard", key: "dashboard", href: "/dashboard" },
  { label: "Portfolio", key: "portfolio", href: "/dashboard/portfolio" },
  { label: "Blog", key: "blog", href: "/dashboard/blog" },
  { label: "Category", key: "category", href: "/dashboard/category" },
  { label: "Note", key: "note", href: "/dashboard/note" },
];

const mockBlogs = [
  { id: 1, title: "Modern Web Development Trends 2024", date: "2024-06-01" },
  { id: 2, title: "Building Scalable APIs with Node.js", date: "2024-05-20" },
];
const mockPortfolios = [
  { id: 1, title: "Swop App", date: "2023-05-10" },
  { id: 2, title: "ePharma Web", date: "2022-08-15" },
];
const mockCategories = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Backend" },
];
const mockNotes = [
  { id: 1, note: "Finish dashboard UI", date: "2024-06-10" },
  { id: 2, note: "Update portfolio section", date: "2024-06-09" },
];

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Blogs",
      data: [2, 4, 3, 5, 6, 4, 7],
      backgroundColor: "#8750f7",
    },
    {
      label: "Portfolios",
      data: [1, 2, 2, 3, 4, 3, 5],
      backgroundColor: "#2a1454",
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Content Growth" },
  },
};

export default function DashboardPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setLoggedIn(Cookies.get("dashboard_logged_in") === "true");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === USER_EMAIL && password === USER_PASS) {
      Cookies.set("dashboard_logged_in", "true", { expires: 7 });
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    Cookies.remove("dashboard_logged_in");
    setLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232526] to-[#414345]">
        <form
          onSubmit={handleLogin}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20 flex flex-col gap-4"
          style={{
            width: "400px",
            height: "500px",
            maxWidth: "90vw",
            maxHeight: "90vh",
            justifyContent: "center",
          }}
        >
          <h2 className="text-3xl font-bold text-white mb-2 text-center tracking-wide">
            Dashboard Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-white/10 text-white border border-white/20 focus:outline-none placeholder:text-white/60"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-white/10 text-white border border-white/20 focus:outline-none placeholder:text-white/60"
            required
          />
          {error && (
            <div className="text-red-500 text-sm text-center font-semibold">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="bg-gradient-to-r from-[#8750f7] to-[#2a1454] text-white py-2 rounded font-semibold hover:from-[#2a1454] hover:to-[#8750f7] transition"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-[#8750f7]">
            Content Growth
          </h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-[#8750f7]">
            Blog List
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Title</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockBlogs.map((blog) => (
                <tr key={blog.id} className="border-b last:border-b-0">
                  <td className="py-2">{blog.title}</td>
                  <td className="py-2">{blog.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-[#8750f7]">
            Portfolio List
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Title</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockPortfolios.map((portfolio) => (
                <tr key={portfolio.id} className="border-b last:border-b-0">
                  <td className="py-2">{portfolio.title}</td>
                  <td className="py-2">{portfolio.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-[#8750f7]">
            Category List
          </h2>
          <ul>
            {mockCategories.map((cat) => (
              <li key={cat.id} className="py-1 border-b last:border-b-0">
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-[#8750f7]">
            Note List
          </h2>
          <ul>
            {mockNotes.map((note) => (
              <li
                key={note.id}
                className="py-1 border-b last:border-b-0 flex justify-between items-center"
              >
                <span>{note.note}</span>
                <span className="text-xs text-gray-400">{note.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
