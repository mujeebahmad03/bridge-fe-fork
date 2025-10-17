import { Card } from "@/components/ui/card";

import { features } from "@/config/constants";

export const Features = () => {
  return (
    <section className="bg-secondary/30 px-4 py-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything You Need for Successful Sales Outreach
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features to streamline your sales process
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="animate-[fade-in_0.5s_ease-out_forwards] p-6 opacity-0 transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-start space-y-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
