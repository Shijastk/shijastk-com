export default function AdminHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-8">
      <h1 className="font-incognito font-bold text-3xl tracking-tight">{title}</h1>
      {description ? (
        <p className="text-sm text-zinc-500 mt-1">{description}</p>
      ) : null}
    </header>
  );
}
