import Link from "next/link";

import { EmailIllustration } from "@/components/common/illustrations/email-illustration";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { authRoutes } from "@/config/routes";

const VerificationSuccessPage = () => {
  return (
    <Card className="w-full max-w-md space-y-8">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <EmailIllustration />
        </div>
        <CardTitle className="text-2xl font-semibold text-primary">
          Email Verification Successful
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 text-center">
        <p className="text-muted-foreground">
          Your email has been successfully verified. Proceed to setting up your
          account.
        </p>
        <Button asChild className="w-full">
          <Link href={authRoutes.login}>Proceed to login</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerificationSuccessPage;
