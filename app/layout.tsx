import ShoppingCartProvider from "./components/ShoppingCartProvider";
import "./globals.css";
import Navbar from "@/app/components/Navbar";

export const metadata = {
  title: "Xata Ecommerce Template",
  description:
    "Using Stripe, Xata, &  Next.js we've built a bare bones ecommerce template.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col w-screen items-center">
        <ShoppingCartProvider>
          <Navbar />
          {children}
        </ShoppingCartProvider>
      </body>
    </html>
  );
}
