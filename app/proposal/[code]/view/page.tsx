import { HeroSection } from "@/components/proposal/sections/HeroSection";
import { TransformationSection } from "@/components/proposal/sections/TransformationSection";
import { ChallengeSection } from "@/components/proposal/sections/ChallengeSection";
import { PartnerSection } from "@/components/proposal/sections/PartnerSection";
import { TestimonialsSection } from "@/components/proposal/sections/TestimonialsSection";
import { PlatformSection } from "@/components/proposal/sections/PlatformSection";
import { DeliverablesSection } from "@/components/proposal/sections/DeliverablesSection";
import { DemoSection } from "@/components/proposal/sections/DemoSection";
import { FutureVisionSection } from "@/components/proposal/sections/FutureVisionSection";
import { InvestmentSection } from "@/components/proposal/sections/InvestmentSection";
import { SupportSection } from "@/components/proposal/sections/SupportSection";
import { FAQSection } from "@/components/proposal/sections/FAQSection";
import { NextStepsSection } from "@/components/proposal/sections/NextStepsSection";
import { SectionWrapper } from "@/components/proposal/SectionWrapper";

export default function ProposalPage() {
  return (
    <>
      <HeroSection />
      <SectionWrapper sectionId="transformation" title="The Journey" commentsReadOnly>
        <TransformationSection />
      </SectionWrapper>
      <SectionWrapper sectionId="challenge" title="The Challenge" commentsReadOnly>
        <ChallengeSection />
      </SectionWrapper>
      <SectionWrapper sectionId="partner" title="The Partner" commentsReadOnly>
        <PartnerSection />
      </SectionWrapper>
      <SectionWrapper sectionId="testimonials" title="Results" commentsReadOnly>
        <TestimonialsSection />
      </SectionWrapper>
      <SectionWrapper sectionId="platform" title="The Platform" commentsReadOnly>
        <PlatformSection />
      </SectionWrapper>
      <SectionWrapper sectionId="deliverables" title="Phase 1 — Scope & Deliverables" commentsReadOnly>
        <DeliverablesSection />
      </SectionWrapper>
      <SectionWrapper sectionId="demo" title="Live Demo" commentsReadOnly>
        <DemoSection />
      </SectionWrapper>
      <SectionWrapper sectionId="investment" title="Investment" commentsReadOnly>
        <InvestmentSection />
      </SectionWrapper>
      <SectionWrapper sectionId="support" title="Ongoing Support" isNew commentsReadOnly>
        <SupportSection />
      </SectionWrapper>
      <SectionWrapper sectionId="faq" title="Questions & Answers" defaultExpanded isNew>
        <FAQSection />
      </SectionWrapper>
      <SectionWrapper sectionId="future" title="Future Vision" commentsReadOnly>
        <FutureVisionSection />
      </SectionWrapper>
      <SectionWrapper sectionId="next-steps" title="Next Steps" commentsReadOnly>
        <NextStepsSection />
      </SectionWrapper>
    </>
  );
}
