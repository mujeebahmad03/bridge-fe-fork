"use client";

import { OptimizedSection } from "@/components/ui/optimized-motion";

export function HeroHeadline() {
  return (
    <OptimizedSection variant="fadeInUp" delay={0.1}>
      <h1 className="mb-8 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
        <span className="text-primary">Get More Replies</span>
        <br />
        <span className="text-foreground">Book More Meetings</span>
        <br />
        <span className="text-primary">Close More Deals.</span>
      </h1>

      {/* Hidden semantic content for SEO */}
      <div className="sr-only">
        <h2>AI-Powered Sales Automation Platform</h2>
        <p>
          Bridge is the leading AI sales platform that helps sales teams
          automate multichannel outreach, manage leads efficiently, and increase
          conversion rates through intelligent messaging and real-time
          analytics.
        </p>

        <h3>Key Features:</h3>
        <ul>
          <li>AI-powered message drafting and personalization</li>
          <li>
            Multichannel outreach automation (Email, LinkedIn, Phone, SMS)
          </li>
          <li>Built-in CRM with lead scoring and pipeline management</li>
          <li>Real-time lead signals and engagement tracking</li>
          <li>Advanced sales analytics and reporting</li>
          <li>Team collaboration and workflow automation</li>
        </ul>

        <h3>Benefits:</h3>
        <ul>
          <li>Increase reply rates by up to 300%</li>
          <li>Book 4x more meetings with less effort</li>
          <li>Save 20+ hours per week on manual tasks</li>
          <li>Improve lead conversion rates by 85%</li>
          <li>Scale outreach without hiring more staff</li>
        </ul>
      </div>
    </OptimizedSection>
  );
}
