import { HeroSection } from "@/components/proposal/sections/HeroSection";
import { ChallengeSection } from "@/components/proposal/sections/ChallengeSection";
import { PartnerSection } from "@/components/proposal/sections/PartnerSection";
import { PlatformSection } from "@/components/proposal/sections/PlatformSection";
import { DeliverablesSection } from "@/components/proposal/sections/DeliverablesSection";
import { DemoSection } from "@/components/proposal/sections/DemoSection";
import { FutureVisionSection } from "@/components/proposal/sections/FutureVisionSection";
import { InvestmentSection } from "@/components/proposal/sections/InvestmentSection";
import { NextStepsSection } from "@/components/proposal/sections/NextStepsSection";
import { SectionWrapper } from "@/components/proposal/SectionWrapper";

export default function ProposalPage() {
  return (
    <>
      <HeroSection />
      <SectionWrapper sectionId="challenge">
        <ChallengeSection />
      </SectionWrapper>
      <SectionWrapper sectionId="partner">
        <PartnerSection />
      </SectionWrapper>
      <SectionWrapper sectionId="platform">
        <PlatformSection />
      </SectionWrapper>
      <SectionWrapper sectionId="deliverables">
        <DeliverablesSection />
      </SectionWrapper>
      <SectionWrapper sectionId="demo">
        <DemoSection />
      </SectionWrapper>
      <SectionWrapper sectionId="future">
        <FutureVisionSection />
      </SectionWrapper>
      <SectionWrapper sectionId="investment">
        <InvestmentSection />
      </SectionWrapper>
      <SectionWrapper sectionId="next-steps">
        <NextStepsSection />
      </SectionWrapper>
    </>
  );
}
