import { CurrencyConverterCard } from '@/components/currency-converter-card';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background transition-colors duration-300">
      <header className="absolute top-4 right-4">
        <ThemeSwitcher />
      </header>
      <main className="w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary tracking-tight">
          Currency Converter
          <br />
          <span>
            by
            <a href='taskin.studio' target='_blank' rel='noopener noreferrer' className='text-none' >
              TaskIn Studio
            </a>
          </span>
        </h1>
        <CurrencyConverterCard />
      </main>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} 
          <a href="https://taskin.studio" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            TaskIn Studio. 
          </a>
          All rights reserved.</p>
        <p className="mt-1">
          Exchange rates provided by{' '}
          <a
            href="https://www.frankfurter.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            Frankfurter API
          </a>.
        </p>
      </footer>
    </div>
  );
}
