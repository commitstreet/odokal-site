import type { Metadata } from "next";
import { InviteView } from "@/components/invite-view";

export const metadata: Metadata = {
  title: "You're invited to ride",
  description: "A crew invited you to ride with them on Odokal.",
  robots: { index: false },
};

export default function Invite() {
  return <InviteView />;
}
