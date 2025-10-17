"use client";
import { InlineWidget } from "react-calendly";

const CalendlySetup = () => {
  return (
    <div className="min-h-screen bg-[#181818] py-20 mt-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-white font-bold text-3xl md:text-5xl mb-4">
            Schedule a Meeting
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Book a free consultation call to discuss your project. I&apos;m here
            to help bring your ideas to life!
          </p>
        </div>

        {/* Calendly Widget */}
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
          <InlineWidget
            url="https://calendly.com/arsahakbd/30min"
            styles={{
              height: "700px",
              minWidth: "100%",
            }}
            pageSettings={{
              backgroundColor: "ffffff",
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: "3b82f6",
              textColor: "1f2937",
            }}
          />
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="text-white font-semibold text-xl mb-2">
              30-Minute Call
            </h3>
            <p className="text-gray-400">
              Quick consultation to understand your project requirements and
              goals.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-white font-semibold text-xl mb-2">
              Free Consultation
            </h3>
            <p className="text-gray-400">
              No commitment required. Let&apos;s discuss how I can help with
              your project.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="text-white font-semibold text-xl mb-2">
              Remote Meeting
            </h3>
            <p className="text-gray-400">
              Video call via Google Meet or Zoom - whatever works best for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendlySetup;
