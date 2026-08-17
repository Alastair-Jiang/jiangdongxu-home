export default function SectionTitle({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-sm text-accent">{index}</span>
      <h2 className="text-2xl font-semibold text-fg">{title}</h2>
      <div className="ml-2 h-px flex-1 bg-line" />
    </div>
  );
}
