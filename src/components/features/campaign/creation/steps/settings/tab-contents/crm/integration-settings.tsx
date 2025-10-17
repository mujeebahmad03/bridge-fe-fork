import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IntegrationSettings = () => {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-lg text-primary">
          Integration Settings
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure your CRM integrations and sync settings
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-accent/30 py-12">
          <div className="space-y-2 text-center">
            <div className="text-sm text-muted-foreground">
              Integration settings coming soon
            </div>
            <div className="text-xs text-muted-foreground/70">
              Connect your favorite CRM tools and services
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationSettings;
