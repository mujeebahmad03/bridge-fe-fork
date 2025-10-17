export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "VP of Sales",
    company: "TechFlow Solutions",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=facearea&facepad=2&w=80&h=80",
    quote:
      "Bridge helped me book 4x more meetings in half the time — without extra hires. I stopped switching between tools. My pipeline's cleaner, and I close faster.",
    rating: 5,
    metrics: [
      { label: "More Meetings", value: "4x" },
      { label: "Time Saved", value: "50%" },
    ],
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Sales Director",
    company: "Growth Dynamics",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=facearea&facepad=2&w=80&h=80",
    quote:
      "The AI-powered messaging is a game changer. Our response rates increased by 300% and our team is closing deals faster than ever before.",
    rating: 5,
    metrics: [
      { label: "Response Rate", value: "+300%" },
      { label: "Deal Velocity", value: "+150%" },
    ],
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Head of Business Development",
    company: "Scale Ventures",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=80&h=80",
    quote:
      "Bridge transformed our entire sales process. The automation features saved us 20 hours per week, and our conversion rates have never been higher.",
    rating: 5,
    metrics: [
      { label: "Time Saved", value: "20hrs/week" },
      { label: "Conversion Rate", value: "+85%" },
    ],
  },
  {
    id: 4,
    name: "David Kim",
    role: "Sales Manager",
    company: "InnovateCorp",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=facearea&facepad=2&w=80&h=80",
    quote:
      "The real-time insights and lead scoring helped us prioritize the right prospects. We've seen a 250% increase in qualified leads.",
    rating: 5,
    metrics: [
      { label: "Qualified Leads", value: "+250%" },
      { label: "Pipeline Quality", value: "+180%" },
    ],
  },
];
