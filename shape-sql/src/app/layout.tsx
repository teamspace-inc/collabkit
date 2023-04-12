import './globals.css';

export const metadata = {
  title: 'Shape',
  description: 'Get answers from an AI data scientist',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
