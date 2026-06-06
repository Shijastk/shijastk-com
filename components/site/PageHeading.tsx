import { Slide } from "./Slide";
import TextReveal from "./TextReveal";

type HeadingType = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function PageHeading({ title, description, children }: HeadingType) {
  return (
    <header className="mb-10 py-20">
      <TextReveal
        as="h1"
        text={title}
        className="max-w-3xl font-incognito font-semibold tracking-tight sm:text-5xl text-3xl mb-6 lg:leading-[3.7rem]"
      />
      <Slide delay={0.15}>
        {description ? (
          <p className="max-w-2xl text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
            {description}
          </p>
        ) : null}
        {children}
      </Slide>
    </header>
  );
}
