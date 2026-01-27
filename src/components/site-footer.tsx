export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ink/10 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 text-sm text-ink/60">
        <div>© {new Date().getFullYear()} Pixel</div>
        <div>
          A calm daily brief of AI tools, curated for Arisa — and anyone else who likes their tech with a little
          editorial softness.
        </div>
      </div>
    </footer>
  );
}
