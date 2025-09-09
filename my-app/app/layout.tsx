import type { Metadata } from 'next'
import '../src/index.css'
 
export const metadata: Metadata = {
  title: 'Sentence Repeater',
  description: 'a Tool to duplicate a sentence with certain variations and rules',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    </>
  );
}
