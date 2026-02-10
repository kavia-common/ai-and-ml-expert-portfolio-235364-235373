import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100dvh-64px)] bg-[var(--color-background)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="surface overflow-hidden">
          <div className="bg-gradient-to-br from-blue-900/10 to-amber-600/10 p-6">
            <h1 className="text-2xl font-extrabold text-black">
              404 — Page Not Found
            </h1>
            <p className="mt-2 text-sm font-semibold text-black/60">
              The page you’re looking for doesn’t exist, but the portfolio does.
            </p>
          </div>

          <div className="p-6">
            <p className="text-sm text-black/75">
              Use the button below to return to the homepage.
            </p>
            <div className="mt-5">
              <Link className="focus-ring inline-block rounded-xl" href="/#home">
                <Button variant="primary" type="button">
                  Go to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
