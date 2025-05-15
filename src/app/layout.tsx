import type { Metadata } from 'next';
import { inter } from '@/lib/fonts'; // Import Inter font
import './globals.css';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster

export const metadata: Metadata = {
  title: 'Taskin Currency Converter', // Updated app title
  description: 'Real-time currency conversion tool by TaskIn Studio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
