import Image from "next/image";

import { Button } from "@/components/ui";

export const SocialAuth = () => {
  return (
    <div className="mb-8 space-y-4">
      <Button
        variant="outline"
        className="relative h-[56px] w-full border-0 bg-blue-500 text-white transition-colors duration-300 hover:bg-blue-500/90 hover:text-white"
      >
        <span className="absolute left-[2px] flex size-[52px] items-center justify-center rounded-md bg-white">
          <Image
            src="https://www.google.com/favicon.ico"
            alt="Google"
            width={40}
            height={40}
            className="size-6"
          />
        </span>
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="relative w-full py-6 transition-colors hover:bg-blue-50"
      >
        <Image
          src="https://www.microsoft.com/favicon.ico"
          alt="Outlook"
          width={40}
          height={40}
          className="absolute left-4 h-5 w-5"
        />
        Sign up with Outlook
      </Button>
    </div>
  );
};

export const OrComp = () => {
  return (
    <div className="relative mb-8 space-y-8">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-2 text-gray-500">Or</span>
      </div>
    </div>
  );
};
