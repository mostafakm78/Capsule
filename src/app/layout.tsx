import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './providers/Theme-provider';
import { ReduxProvider } from './providers/Redux-Provider';
import { Toaster } from '@/components/ui/sonner';
import ProgressBarLoading from './components/shared/Progressbar';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.PUBLIC_URL ?? 'http://localhost:3000'),
  title: 'سایت کپسول',
  description: 'کپسول یه جور زمان‌نگهداره. خاطره‌هات رو با صدا، عکس یا نوشته می‌ذاری توش، زمان باز شدنش رو مشخص می‌کنی، و بعد... می‌مونه تا روزی که برگردی و دوباره بخونیش. برای خودت، برای یه عزیز، یا حتی واسه کسی که هنوز پیداش نکردی.',
  icons: [{ url: '/images/Logo.png' }],
  openGraph: {
    title: 'سایت کپسول',
    url: process.env.PUBLIC_URL ?? 'http://localhost:3000',
    description: 'کپسول یه جور زمان‌نگهداره. خاطره‌هات رو با صدا، عکس یا نوشته می‌ذاری توش، زمان باز شدنش رو مشخص می‌کنی، و بعد... می‌مونه تا روزی که برگردی و دوباره بخونیش. برای خودت، برای یه عزیز، یا حتی واسه کسی که هنوز پیداش نکردی.',
    images: [
      {
        url: '/images/Logo.png',
        width: 512,
        height: 512,
        alt: 'سایت کپسول',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سایت کپسول',
    description: 'کپسول یه جور زمان‌نگهداره. خاطره‌هات رو با صدا، عکس یا نوشته می‌ذاری توش، زمان باز شدنش رو مشخص می‌کنی، و بعد... می‌مونه تا روزی که برگردی و دوباره بخونیش. برای خودت، برای یه عزیز، یا حتی واسه کسی که هنوز پیداش نکردی.',
    images: ['/images/Logo.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-background overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            <ProgressBarLoading />
            {children}
            <Toaster position="top-right" />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
