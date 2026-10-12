"use client";

import { useEffect, useState } from "react";
import { DEFAULT_READOUT, RidingPhone, type RideReadout, type RiderStatus } from "./mockups";

/** A short scripted ride: Mohit falls back, the crew regroups, Sameer gets signal again. */
const SCRIPT: RiderStatus[][] = [
  DEFAULT_READOUT.roster,
  [
    { name: "Vinay", status: "With group", tone: "ok" },
    { name: "Rahul", status: "0.2 km ahead", tone: "ahead" },
    { name: "Mohit", status: "1.6 km behind", tone: "behind" },
    { name: "Sameer", status: "No signal · 13 min", tone: "off" },
  ],
  [
    { name: "Vinay", status: "With group", tone: "ok" },
    { name: "Rahul", status: "With group", tone: "ok" },
    { name: "Mohit", status: "0.4 km behind", tone: "behind" },
    { name: "Sameer", status: "Back · syncing", tone: "ahead" },
  ],
  [
    { name: "Vinay", status: "With group", tone: "ok" },
    { name: "Rahul", status: "With group", tone: "ok" },
    { name: "Mohit", status: "With group", tone: "ok" },
    { name: "Sameer", status: "With group", tone: "ok" },
  ],
];

export function LiveRidingPhone() {
  const [r, setR] = useState<RideReadout>(DEFAULT_READOUT);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tick = 0;
    const id = window.setInterval(() => {
      tick++;
      setR((prev) => {
        const speed = Math.round(62 + Math.sin(tick / 2.3) * 8 + Math.random() * 3);
        const kmDone = prev.kmDone >= 131 ? 118.6 : prev.kmDone + speed / 3600 * 1.2 * 10;
        const seconds = 2 * 3600 + 14 * 60 + tick * 12;
        const clock = `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}`;
        return {
          speed,
          kmDone,
          elevation: Math.round(842 + Math.sin(tick / 4) * 60),
          progress: Math.min(0.95, 0.58 + (kmDone - 118.6) / 60),
          clock,
          roster: SCRIPT[Math.floor(tick / 4) % SCRIPT.length],
        };
      });
    }, 1200);
    return () => window.clearInterval(id);
  }, []);

  return <RidingPhone r={r} />;
}
