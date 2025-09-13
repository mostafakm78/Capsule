import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/providers/Theme-provider';
import { ReduxProvider } from './components/providers/Redux-Provider';
import { Toaster } from '@/components/ui/sonner';
import 'swiper/css';
import ProgressBarLoading from './components/shared/Progressbar';
import { UserHydrator } from './services/UserHydrator';
// import { UserHydrator } from './services/UserHydrator';

export const metadata: Metadata = {
  title: 'Capsule',
  description: 'created by mostafa kamari',
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
            {/* <UserHydrator /> */}
            <ProgressBarLoading />
            {children}
            <Toaster
              position="top-right"
            />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
