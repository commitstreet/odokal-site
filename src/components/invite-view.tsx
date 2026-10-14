import { AppIcon } from "./brand";
import { InviteCode } from "./invite-code";
import { WaitlistForm } from "./waitlist-form";

/** What someone sees after tapping a crew invite link without the app installed. */
export function InviteView() {
  return (
    <section className="mx-auto grid max-w-2xl justify-items-start gap-5 px-5 pt-16 sm:px-8">
      <AppIcon size={72} />
      <p className="eyebrow">Crew invite</p>
      <h1 className="font-head text-5xl font-bold uppercase">You&apos;re invited to ride</h1>
      <InviteCode />
      <p className="text-ink-2">
        Odokal is coming soon to Android. Join the beta list and we&apos;ll email you as soon as you can install it.
      </p>
      <WaitlistForm compact source="invite" />
    </section>
  );
}
