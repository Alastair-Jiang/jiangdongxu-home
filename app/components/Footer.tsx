import SectionTitle from "./SectionTitle";

const links = [
  { label: "github", href: "https://github.com/Alastair-Jiang" },
  { label: "email", href: "mailto:2684331892@qq.com" },
  { label: "telegram", href: "https://t.me/Nemco_bot" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <SectionTitle index="03" title="联系" />
        <div className="mt-6 flex flex-wrap gap-6 font-mono text-sm">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-muted transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
        <p className="mt-10 font-mono text-xs text-muted">© 2026 Alastair</p>
      </div>
    </footer>
  );
}
