import { toast } from "sonner";

export function showMaintenanceToast() {
  toast.error(
    "This project is discontinued. we started a V2 but discontinued it mid-way as well.",
    {
      duration: 10000,
      important: true,
      action: {
        label: "View V2",
        onClick: () =>
          window.open(
            "https://github.com/Aryan-561/kiheat-frontend-v2",
            "_blank",
          ),
      },
    },
  );
}
