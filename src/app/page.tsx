import { DotBike } from "@/components/dot-bike";
import { GhatRoute } from "@/components/ghat-route";
import { LiveRidingPhone } from "@/components/live-riding-phone";
import { EnamelPin, JournalTicket, Stamps } from "@/components/mockups";
import { RoadTicker } from "@/components/road-ticker";
import { WaitlistForm } from "@/components/waitlist-form";

function Odometer({ value }: { value: string }) {
  return (
    <span className="inline-flex gap-1 rounded-lg bg-moss p-1.5" aria-label={`${value} kilometres`}>
      {value.split("").map((d, i) => (
        <span
          key={i}
          className={`grid h-12 w-9 place-items-center overflow-hidden rounded font-mono text-3xl font-semibold ${
            i === value.length - 1 ? "bg-accent text-on-accent" : "bg-surface text-ink"
          }`}
        >
          <span className="odo-roll" style={{ animationDelay: `${i * 120}ms` }}>
            {d}
          </span>
        </span>
      ))}
    </span>
  );
}

const STEPS = [
  {
    title: "Plan",
    body: "Build a route by tapping waypoints, or import a GPX. Add fuel, food, viewpoints and the night's stay. See distance, climbing and how hard the day is.",
  },
  {
    title: "Gather",
    body: "Start a crew, share one invite link, and set a ride. Everyone RSVPs, the leader and sweep are named, and the offline map downloads before you leave.",
  },
  {
    title: "Ride",
    body: "One screen with your speed, the next stop, and where every rider is: with the group, ahead, falling behind, or out of signal.",
  },
  {
    title: "Remember",
    body: "When you park, the ride becomes a journal entry: route, numbers, photos, notes, and the milestones you earned along the way.",
  },
];

const ITINERARIES = [
  { name: "Western Ghats Classic", route: "Bengaluru → Chikmagalur → Sakleshpur → Bengaluru", days: 3, km: 690 },
  { name: "Coorg Loop", route: "Mysuru → Madikeri → Bhagamandala → Mysuru", days: 2, km: 380 },
  { name: "Kodaikanal to Munnar", route: "Kodaikanal → Bodimettu → Munnar", days: 2, km: 270 },
  { name: "Kolli Hills", route: "Salem → 70 hairpins → Kolli Hills", days: 1, km: 180 },
];

const FAQ = [
  {
    q: "When can I use it?",
    a: "We're building it now. A closed Android beta comes first, with a small group of crews riding real routes in South India. Join the list and you'll hear when it opens.",
  },
  {
    q: "Is it free?",
    a: "Yes. Odokal is free for riders and crews, with no ads.",
  },
  {
    q: "What about iPhone?",
    a: "Android comes first because most riders here use it. iPhone follows after the Android launch.",
  },
  {
    q: "Does it replace Google Maps?",
    a: "No. Odokal plans the ride and keeps the crew together. For turn-by-turn directions, one tap opens the next leg of the route in Google Maps.",
  },
  {
    q: "What happens when there's no signal in the ghats?",
    a: "Your phone keeps recording the ride and shows the offline map. Crew positions show when each rider was last seen, and everything catches up when the signal returns.",
  },
  {
    q: "Does it work with my bike?",
    a: "Any motorcycle. Add yours to your garage, from a 125 cc commuter to a 650 twin.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20">
        <DotBike className="pointer-events-none absolute inset-x-0 top-2 h-[380px] w-full opacity-[0.14] sm:opacity-20 lg:top-[16%] lg:right-auto lg:left-[28%] lg:h-[440px] lg:w-[54%] lg:opacity-[0.34]" />
        <div className="relative grid gap-6">
          <p className="eyebrow">A riding companion for motorcycle crews · South India</p>
          <h1 className="font-head text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.95] font-bold tracking-tight uppercase">
            Ride together.
            <br />
            Come back with
            <br />
            <span className="road-underline text-accent">the story.</span>
          </h1>
          <p className="max-w-[58ch] text-lg text-ink-2">
            Odokal plans the route, keeps your crew together on the road, and turns every ride into a journal entry with
            milestones you earn along the way.
          </p>
          <WaitlistForm />
        </div>
        <div className="relative flex justify-center lg:justify-end">
          <LiveRidingPhone />
        </div>
      </section>

      <div className="mt-6 mb-10">
        <RoadTicker />
      </div>

      {/* Zero-km strip */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl bg-primary px-6 py-6 text-on-primary">
          <Odometer value="0000" />
          <p className="max-w-[48ch] text-lg">
            <span className="font-brand text-2xl">Every ride starts at zero.</span>
            <br />
            <span className="opacity-80">Ride. Mark. Remember.</span>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="relative mx-auto max-w-6xl px-5 pt-24 sm:px-8" aria-labelledby="how">
        <GhatRoute />
        <p className="eyebrow">How it works</p>
        <h2 id="how" className="mt-2 font-head text-4xl font-bold uppercase">
          From plan to memory
        </h2>
        <ol className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:mt-48 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="reveal grid content-start gap-2 rounded-2xl border border-line bg-surface p-5 shadow-sm">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-head text-2xl font-bold uppercase">{s.title}</h3>
              <p className="text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Live ride */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-24 sm:px-8 lg:grid-cols-2" aria-labelledby="live">
        <div className="grid gap-4">
          <p className="eyebrow">Live ride</p>
          <h2 id="live" className="font-head text-4xl font-bold uppercase">
            Know where everyone is. Without stopping to call.
          </h2>
          <ul className="grid gap-3 text-ink-2">
            <li>
              <b className="text-ink">Crew status at a glance.</b> With the group, a few hundred metres ahead, falling behind,
              or out of signal for twelve minutes.
            </li>
            <li>
              <b className="text-ink">Alerts go to the leader and sweep.</b> Not to every phone in the group, and never
              while you&apos;re trying to ride.
            </li>
            <li>
              <b className="text-ink">Built for the ghats.</b> Offline maps for the route, recording that keeps going
              without signal, and a catch-up when it returns.
            </li>
            <li>
              <b className="text-ink">Made for gloves.</b> Riding mode has big targets, high contrast for sunlight, and
              three actions: SOS, regroup, finish.
            </li>
          </ul>
        </div>
        <div className="reveal rounded-3xl border border-line bg-surface p-6">
          <p className="eyebrow">Crew on the Western Ghats Run</p>
          <div className="mt-4 grid gap-2">
            {[
              ["Vinay", "Leader", "With group", "bg-moss/20"],
              ["Rahul", "", "0.3 km ahead", "bg-surface-2"],
              ["Arjun", "", "With group", "bg-moss/20"],
              ["Mohit", "Sweep", "2.8 km behind", "bg-[#C98A1E]/25"],
              ["Sameer", "", "No signal · 12 min", "bg-surface-2"],
            ].map(([name, role, status, cls]) => (
              <div key={name} className="flex items-center justify-between gap-3 rounded-xl bg-bg px-4 py-3">
                <span>
                  {name}
                  {role && <span className="ml-2 font-mono text-xs tracking-wider text-ink-2 uppercase">{role}</span>}
                </span>
                <span className={`rounded-md px-2 py-0.5 font-mono text-xs ${cls}`}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal + milestones */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]" aria-labelledby="journal">
        <div className="reveal order-2 flex justify-center lg:order-1">
          <JournalTicket />
        </div>
        <div className="order-1 grid gap-4 lg:order-2">
          <p className="eyebrow">Journal, pins and passport</p>
          <h2 id="journal" className="font-head text-4xl font-bold uppercase">
            Every ride, a milestone.
          </h2>
          <p className="text-ink-2">
            Odokal writes the ride record for you: distance, time in the saddle, the highest point you reached, and who rode
            with you. Add photos and a note, and it stays in your history for good.
          </p>
          <p className="text-ink-2">
            Milestones arrive as enamel pins: your first ride, 1,000 km, a night ride, the first monsoon run, Agumbe Ghat.
            Each state you ride in gets a stamp in your passport.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <EnamelPin big="1" small="RIDE" tier="bronze" />
            <EnamelPin big="1K" small="KM" tier="brass" />
            <EnamelPin small="NIGHT" tier="steel" glyph="moon" />
            <EnamelPin small="MONSOON" tier="brass" glyph="drop" />
            <EnamelPin big="10K" small="KM" tier="gold" locked />
          </div>
          <div className="pt-4">
            <p className="eyebrow mb-3">Passport · 4 of 7 states</p>
            <Stamps />
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section className="mx-auto max-w-6xl px-5 pt-24 sm:px-8" aria-labelledby="routes">
        <p className="eyebrow">Ready-made itineraries</p>
        <h2 id="routes" className="mt-2 font-head text-4xl font-bold uppercase">
          Start with the South&apos;s best roads
        </h2>
        <p className="mt-3 max-w-[60ch] text-ink-2">
          Multi-day plans with daily distances, fuel and food stops, and where to stay. These are some of the first we&apos;re
          mapping.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ITINERARIES.map((it) => (
            <article key={it.name} className="reveal grid content-start gap-2 rounded-2xl border border-line bg-surface p-5 transition-transform hover:-translate-y-1">
              <h3 className="font-brand text-xl leading-tight">{it.name}</h3>
              <p className="text-sm text-ink-2">{it.route}</p>
              <p className="mt-auto font-mono text-sm tabular-nums">
                {it.days} {it.days === 1 ? "day" : "days"} · ~{it.km} km
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Privacy promise */}
      <section className="mx-auto max-w-6xl px-5 pt-24 sm:px-8" aria-labelledby="privacy">
        <div className="reveal grid gap-6 rounded-3xl bg-primary p-8 text-on-primary sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] uppercase opacity-80">Your location</p>
            <h2 id="privacy" className="mt-2 font-head text-4xl font-bold uppercase">
              Shared on the ride. Never after.
            </h2>
          </div>
          <ul className="grid gap-3 text-lg">
            <li>Your live location is shared only during a ride you&apos;ve joined, and only with riders on that ride.</li>
            <li>When the ride ends, sharing stops.</li>
            <li>Ride journals hide the start and end near your home.</li>
            <li>No ads, and we never sell your data. Delete your account and your rides from inside the app.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 pt-24 sm:px-8" aria-labelledby="faq">
        <h2 id="faq" className="font-head text-4xl font-bold uppercase">
          Questions
        </h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                {f.q}
                <span className="font-mono text-accent transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-2 text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-5 pt-24 sm:px-8" aria-labelledby="join">
        <div className="grid justify-items-start gap-5 rounded-3xl border border-line bg-surface p-8 sm:p-10">
          <p className="eyebrow">Coming soon to Android</p>
          <h2 id="join" className="font-head text-4xl font-bold uppercase">
            Ride with us in the beta
          </h2>
          <p className="max-w-[56ch] text-ink-2">
            We&apos;re looking for crews in Bengaluru, Chennai, Hyderabad and Kochi to ride real routes with early builds and
            tell us what breaks.
          </p>
          <WaitlistForm compact />
        </div>
      </section>
    </>
  );
}
