import { useState } from "react";

import { TRPCClientError } from "@trpc/client";
import { UpgradeModal } from "@/components/upgrade-modal";

export const useUpgradeModal = () => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  function handleError(error: unknown) {
    if (error instanceof TRPCClientError) {
      if (error.data?.code === "FORBIDDEN") {
        setIsUpgradeModalOpen(true);
        return true;
      }
    }
    return false;
  }

  const modal = (
    <UpgradeModal
      onOpenChange={setIsUpgradeModalOpen}
      open={isUpgradeModalOpen}
    />
  );

  return { handleError, modal };
};
