import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/providers/Theme-provider';

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
      <body className="bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
