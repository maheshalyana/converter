import { CurrencyConverterCard } from "@/components/currency-converter-card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Coins, Github } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background transition-colors duration-300">
      <header className="absolute top-4 right-4 px-20 w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Coins className="w-10 h-10 text-primary" />
          </Link>
          <div className="flex flex-col">
            <Link
              href="/"
              className="text-2xl font-bold text-center text-primary tracking-tight"
            >
              Currency Converter
            </Link>
            <p className="text-sm text-muted-foreground">
              by{" "}
              <span className="underline hover:text-primary">
                <a
                  href="https://taskin.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TaskIn Studio
                </a>
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Link href="/blogs">Blogs</Link>
          </Button>
          <Button variant="outline">
            <Link
              href="https://github.com/maheshalyana/curreny-converter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
            </Link>
          </Button>
          <ThemeSwitcher />
        </div>
      </header>
      <main className="w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary tracking-tight">
          Currency Converter
        </h1>
        <CurrencyConverterCard />
      </main>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://taskin.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            TaskIn Studio
          </a>
          . All rights reserved.
        </p>
        <p className="mt-1">
          Exchange rates provided by{" "}
          <a
            href="https://www.frankfurter.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            Frankfurter API
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
