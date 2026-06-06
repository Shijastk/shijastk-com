import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Renders Markdown content (replaces Sanity PortableText). */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-content dark:text-zinc-400 text-zinc-600">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
