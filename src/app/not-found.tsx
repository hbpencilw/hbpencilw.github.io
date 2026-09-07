export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-display text-[var(--color-text-primary)]">404</h1>
        <p className="text-body text-[var(--color-text-tertiary)] mt-4">
          Page not found
        </p>
        <a
          href="/"
          className="text-caption text-[var(--color-accent)] mt-6 inline-block hover:underline"
        >
          Return home
        </a>
      </div>
    </div>
  );
}
