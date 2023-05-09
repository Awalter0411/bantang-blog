import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "bantang",
  description: "a blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="w-11/12 m-auto container">
        <Navbar />
        <div className="w-2/4 m-auto">{children}</div>
      </body>
    </html>
  );
}
