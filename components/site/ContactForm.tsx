"use client";

import { useRef, useState } from "react";

/** Services a visitor can express interest in — mirrors the reference page. */
const SERVICES = [
  "UI Design",
  "Web design",
  "Web Development",
  "Frontend",
  "Others",
];

/**
 * Lead form that composes the visitor's input into a prefilled email — no
 * server round-trip. The owner's email is passed down from cached contact info.
 */
export default function ContactForm({ email }: { email: string | null }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const toggleService = (service: string) =>
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );

  const subject = `New project enquiry${name ? ` from ${name}` : ""}`;
  const body = [
    name ? `Name: ${name}` : null,
    from ? `Email: ${from}` : null,
    services.length ? `Interested in: ${services.join(", ")}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !formRef.current?.reportValidity()) return;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const fieldClass =
    "w-full bg-transparent border-0 border-b dark:border-zinc-700 border-zinc-300 px-0 py-3 text-lg placeholder:text-zinc-500 focus:outline-none focus:border-primary-color transition-colors";

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <fieldset className="mb-14">
        <legend className="text-lg dark:text-zinc-400 text-zinc-500 mb-6">
          I&apos;m interested in&hellip;
        </legend>
        <div className="flex flex-wrap gap-4">
          {SERVICES.map((service) => {
            const active = services.includes(service);
            return (
              <button
                type="button"
                key={service}
                aria-pressed={active}
                onClick={() => toggleService(service)}
                className={`rounded-2xl border px-7 py-4 text-base font-incognito transition-colors ${
                  active
                    ? "bg-primary-color text-zinc-900 border-transparent"
                    : "dark:border-zinc-700 border-zinc-300 dark:text-zinc-200 text-zinc-700 hover:dark:border-zinc-500 hover:border-zinc-400"
                }`}
              >
                {service}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-8 mb-8">
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What's your name ?"
          required
          autoComplete="name"
          className={fieldClass}
        />
        <input
          name="email"
          type="email"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="What's your Email ?"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tell us about your project"
        required
        rows={3}
        className={`${fieldClass} resize-none mb-12`}
      />

      <button
        type="submit"
        disabled={!email}
        className="rounded-full bg-primary-color text-zinc-900 font-incognito font-semibold text-lg px-14 py-4 hover:bg-secondary-color disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-primary-color/40"
      >
        Submit
      </button>
    </form>
  );
}
