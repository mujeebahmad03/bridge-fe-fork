import Image from "next/image";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";

interface WelcomeDialogProps {
  showWelcomeModal: boolean;
  setShowWelcomeModal: (value: boolean) => void;
  handleContinue: () => void;
}

export const WelcomeDialog = ({
  showWelcomeModal,
  setShowWelcomeModal,
  handleContinue,
}: WelcomeDialogProps) => {
  return (
    <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
      <DialogContent className="overflow-hidden rounded-2xl sm:max-w-[500px]">
        <div className="space-y-6 p-6">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl">Hi Neyil,</DialogTitle>
              <p className="text-lg font-normal text-muted-foreground">
                Welcome to Bridge
              </p>
            </div>
            <Image
              src={"/dread-sticker.png"}
              width={100}
              height={100}
              alt="sticker"
            />
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold leading-tight">
                <span className="text-primary">Find</span>,{" "}
                <span className="text-primary">Engage</span>,
                <br />
                and <span className="text-primary">Close</span> Your
                <br />
                Target Clients.
              </h2>
              <p className="text-muted-foreground">
                We ensure every interaction is personalized
                <br />
                using our AI technology
              </p>
            </div>

            <Button className="w-full py-6 text-lg" onClick={handleContinue}>
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
