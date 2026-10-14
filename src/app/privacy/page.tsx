import type { Metadata } from "next";
import { Prose } from "@/components/prose";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy", description: "How Odokal handles your data on this website and the beta waitlist." };

export default function Privacy() {
  return (
    <Prose eyebrow="Privacy" title="Your data" updated="14 October 2026">
      <p>
        Odokal is not released yet. This policy covers this website and the beta waitlist. We will publish a full policy for
        the app, covering ride and location data, before the beta opens, and we will email everyone on the waitlist when we
        do.
      </p>

      <h2>What we collect here</h2>
      <ul>
        <li>
          <strong>Your email address</strong> when you join the waitlist.
        </li>
        <li>
          <strong>Only if you choose to tell us:</strong> your first name, the city you ride from, what you ride, and whether
          you ride with a crew (and its name).
        </li>
        <li>
          <strong>Which sign-up form you used</strong> (for example, the top of the home page) and when you signed up.
        </li>
        <li>
          <strong>Nothing else.</strong> This site sets no cookies, runs no analytics or advertising scripts, and loads its
          fonts from our own server.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To email you when the beta opens, and when the app launches.</li>
        <li>To decide which cities, bikes and crews to invite to the beta first.</li>
      </ul>

      <h2>Where it is stored</h2>
      <p>
        Waitlist sign-ups are stored in a private Google Sheet that only the Odokal team can open. Google stores it on our
        behalf and does not use it for advertising.
      </p>
      <p>We never sell your email address or share it for anyone else&apos;s marketing.</p>

      <h2>How long we keep it</h2>
      <p>
        Until the app launches publicly, or until you ask us to remove it, whichever comes first. Every email we send has a
        way to leave the list.
      </p>

      <h2>Our promises for the app</h2>
      <p>These shape how we are building Odokal, and the full app policy will hold us to them:</p>
      <ul>
        <li>Your live location is shared only during a ride you have joined, only with riders on that ride, and sharing stops when the ride ends.</li>
        <li>Ride journals hide the start and end of a ride near your home.</li>
        <li>No ads, and no selling of personal data.</li>
        <li>You can delete your account and all your rides from inside the app.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Under India&apos;s Digital Personal Data Protection Act, 2023, you can ask what we hold about you, ask us to correct
        it, or ask us to delete it.
        {site.contactEmail ? (
          <>
            {" "}
            Write to <span className="text-ink select-all">{site.contactEmail}</span>.
          </>
        ) : (
          " A contact address for these requests will be published here before the waitlist opens."
        )}
      </p>
    </Prose>
  );
}
