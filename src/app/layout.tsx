import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/providers/Theme-provider';
import { ReduxProvider } from './components/providers/Redux-Provider';
import IsLoggedInClient from './services/isLoggedIn';


export const metadata: Metadata = {
  title: 'Capsule',
  description: 'created by mostafa kamari',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="bg-background overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            <IsLoggedInClient />
            {children}
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
