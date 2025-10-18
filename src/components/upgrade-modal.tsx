import { authClient } from "@/lib/auth/auth-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeModal({ onOpenChange, open }: UpgradeModalProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upgrade to Pro</AlertDialogTitle>
          <AlertDialogDescription>
            You need an active subscription to proceed with this action, upgrade
            to pro to access all the features Instrument has to offer
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => authClient.checkout({ slug: "Instrument-Pro" })}
          >
            Upgrade Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
