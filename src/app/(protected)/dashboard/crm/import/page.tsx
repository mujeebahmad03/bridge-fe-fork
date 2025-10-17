import { Suspense } from "react";

import { ImportPage } from "@/crm/dashboard/pages";
import { PageLoading } from "@/crm/dashboard/components";

const Page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <ImportPage />
    </Suspense>
  );
};

export default Page;
