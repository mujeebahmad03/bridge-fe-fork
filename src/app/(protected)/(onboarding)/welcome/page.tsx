import {
  AnimatedRing,
  HowYouHearAboutUs,
} from "@/components/features/onboarding";

const WelcomePage = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Top Section with Ring */}
      <AnimatedRing />
      {/* Bottom Section */}
      <HowYouHearAboutUs />
    </div>
  );
};

export default WelcomePage;
