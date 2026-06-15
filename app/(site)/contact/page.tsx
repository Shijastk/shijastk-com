import type { Metadata } from "next";
import PageHeading from "@/components/site/PageHeading";
import ContactForm from "@/components/site/ContactForm";
import Social from "@/components/site/Social";
import RefLink from "@/components/site/RefLink";
import { Slide } from "@/components/site/Slide";
import { getContact, getSocialLinks } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind? Get in touch — let's build something great together.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const [contact, social] = await Promise.all([
    getContact(),
    getSocialLinks(),
  ]);

  const waNumber = contact.phone?.replace(/[^0-9]/g, "");

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <div className="max-w-md">

      <PageHeading title="Interested? Let's get your project started!" />
      </div>

      <Slide delay={0.1}>
        <section className="grid lg:grid-cols-[1.6fr_1fr] grid-cols-1 gap-x-16 gap-y-16 mb-24 mt-6">
          {/* Lead form */}
          <ContactForm email={contact.email} />

          {/* Availability + direct contact */}
          <aside className="flex flex-col gap-12">
            <div>
              <h2 className="font-incognito font-semibold text-2xl mb-3">
                Availability
              </h2>
              <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                Currently, I&apos;m accepting only selected projects.
              </p>
            </div>

            {waNumber ? (
              <div>
                <RefLink
                  href={`https://wa.me/${waNumber}`}
                  className="font-incognito font-semibold text-2xl hover:text-primary-color transition-colors"
                >
                  Say Hello, on Whatsapp 👋
                </RefLink>
                <p className="dark:text-zinc-400 text-zinc-600 mt-3">
                  {contact.phone}
                </p>
              </div>
            ) : null}

            {contact.location ? (
              <div>
                <h2 className="font-incognito font-semibold text-2xl mb-3">
                  Location
                </h2>
                <p className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  I&apos;m based in {contact.location}, working with clients
                  remotely across the globe.
                </p>
              </div>
            ) : null}

            {contact.email ? (
              <div>
                <h2 className="font-incognito font-semibold text-2xl mb-3">
                  Email
                </h2>
                <a
                  href={`mailto:${contact.email}`}
                  className="dark:text-zinc-400 text-zinc-600 hover:text-primary-color transition-colors break-all"
                >
                  {contact.email}
                </a>
              </div>
            ) : null}

            {social.length ? (
              <Social links={social} type="social" />
            ) : null}
          </aside>
        </section>
      </Slide>
    </main>
  );
}
