import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '@/lib/app-context';
import { FormProvider } from '@/lib/form-store';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SchemeSaathi — Sahi Yojana, Sahi Samay',
  description:
    'Discover government welfare schemes tailored to your needs. Transparent, rule-based eligibility matching for every citizen.',
  openGraph: {
    title: 'SchemeSaathi — Sahi Yojana, Sahi Samay',
    description:
      'Discover government welfare schemes tailored to your needs.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <FormProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </FormProvider>
        </AppProvider>
      </body>
    </html>
  );
}
