import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { EmailInterface } from "../tasks/interface";

const tasks = ["activity", "notes", "email", "linkedIn", "task", "call"];

export function TasksInterface() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="w-full justify-start gap-8 bg-transparent">
              {tasks.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none capitalize data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="email">
              <EmailInterface />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
