import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="content-normal mx-auto px-6 md:px-12 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[13px] font-mono text-[var(--color-text-tertiary)] tracking-wide">
              {profile.name}
            </p>
            <p className="text-[12px] text-[var(--color-text-tertiary)] mt-1 opacity-60">
              {profile.location}
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
          <p className="text-[11px] text-[var(--color-text-tertiary)] opacity-40 font-mono">
            © {new Date().getFullYear()} — Built with Next.js, GSAP, Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
