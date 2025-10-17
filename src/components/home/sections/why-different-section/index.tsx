"use client";

import { Sparkles, Target, Zap, BarChart3 } from "lucide-react";
import { WhyDifferentHeader } from "./section-header";
import { FeatureCard } from "./feature-card";
import { AIDraftingMockup } from "./mockups/ai-drafting-mockup";
import { CRMDashboardMockup } from "./mockups/crm-dashboard-mockup";
import { AutomationMockup } from "./mockups/automation-mockup";
import { RealtimeSignalMockup } from "./mockups/signal-dashboard-mockup";

export function WhyDifferentSection() {
  return (
    <section className="py-20">
      <WhyDifferentHeader />

      <div className="space-y-0">
        <FeatureCard
          icon={<Sparkles className="h-6 w-6" />}
          title="Send better messages with AI-powered drafting"
          description="Bridge analyzes your communication style, contact data, and context to help you send outreach that feels personal and actually gets replies."
          features={[
            "Draft messages that match your tone and voice.",
            "Personalize outreach based on contact data, or past interaction.",
            "Auto-generate intros, follow-ups, and CTAs.",
            "Write faster, smarter — without starting from scratch.",
          ]}
          mockup={<AIDraftingMockup />}
        />

        <FeatureCard
          icon={<Target className="h-6 w-6" />}
          title="Everything lives in Bridge from first outreach to final close no switching tabs or syncing tools."
          description="Bridge tracks signals, lead engagement, and pipeline activity so you act when it matters most."
          features={[
            "Built-in CRM to track leads, conversations, and deal stages.",
            "View campaign performance, lead timelines, and message history.",
            "Assign leads, collaborate with your team, and stay in control.",
            "One workspace. Full visibility.",
          ]}
          mockup={<CRMDashboardMockup />}
          reverse
          darkBg
        />

        <FeatureCard
          icon={<Zap className="h-6 w-6" />}
          title="Run multichannel campaigns with smart automation"
          description="Set up your sequence once. Bridge handles the sending, follow-ups, and timing across all your channels."
          features={[
            "Launch campaigns via Email, LinkedIn, and more.",
            "Customize steps with delays, conditions, and fallback logic.",
            "Let Bridge automatically pause, resume, or skip leads based on activity.",
            "Track performance and adjust in real time.",
          ]}
          mockup={<AutomationMockup />}
        />

        <FeatureCard
          icon={<BarChart3 className="h-6 w-6" />}
          title="Reach the right people at the right time"
          description="Bridge tracks signals, lead engagement, and pipeline activity so you act when it matters most."
          features={[
            "Prioritize contacts based on activity, and timing.",
            "Auto-adjust follow-ups based on lead behavior.",
            "Get notified when it's time to reach out or close in.",
          ]}
          mockup={<RealtimeSignalMockup />}
          reverse
          darkBg
        />
      </div>
    </section>
  );
}
