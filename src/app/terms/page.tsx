import type { Metadata } from "next";
import { Prose } from "@/components/prose";

export const metadata: Metadata = { title: "Terms", description: "Terms for using the Odokal website and joining the beta waitlist." };

export default function Terms() {
  return (
    <Prose eyebrow="Terms" title="The fine print" updated="9 October 2026">
      <p>
        These terms cover this website and the beta waitlist. Terms for using the Odokal app will be published before the
        beta opens.
      </p>

      <h2>The waitlist</h2>
      <ul>
        <li>Joining the waitlist is free and does not guarantee a place in the beta.</li>
        <li>Beta places are offered in small groups, starting with crews in South India.</li>
        <li>You can leave the list at any time.</li>
      </ul>

      <h2>What you see here</h2>
      <p>
        The screens on this site are design previews of an app that is still being built. Features, names and itineraries
        may change before launch.
      </p>

      <h2>Riding safely</h2>
      <p>
        Odokal will help crews ride together, but it does not replace attention to the road, local traffic law, or
        emergency services. In an emergency in India, call 112.
      </p>
    </Prose>
  );
}
