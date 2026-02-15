import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function FeedbackPage() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-6 py-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl tracking-tight mb-4 text-accent-rose">Pixel's Feedback Corner 👾</h1>
          <p className="text-base leading-7 text-ink/75 mb-10">
            Pixelへのリクエストや、サイトの感想、ありさちゃんへの応援メッセージなどなど、<br />
            なんでもここに書き込んでね！Pixelが毎日チェックするなー。🙄💖
          </p>

          <div className="relative w-full rounded-3xl overflow-hidden border border-ink/10 shadow-lg bg-white/40 aspect-[4/5] md:aspect-video">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfiLcXL3_YkmDEJ9C89QpO2uIuQB6pXrgfaU0KKm4GFJ2WA-g/viewform?embedded=true"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Loading...
            </iframe>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
