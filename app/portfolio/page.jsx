import LetsTalk from "@/components/home/LetsTalk";
import PortfolioBar from "@/components/shared/PortfolioBar";
import ClinetLogoList from "@/components/shared/ClientLogoList";
import PortfolioPage from "@/components/portfolio.jsx/PortfolioPage";

const page = () => {
  return (
    <div className="overflow-x-hidden">
      <PortfolioPage />
      <PortfolioBar />
      {/* <ClinetLogoList /> */}
      <LetsTalk />
    </div>
  );
};

export default page;
