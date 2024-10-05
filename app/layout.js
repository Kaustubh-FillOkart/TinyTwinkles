import { ToastProvider } from "@/components/Toast/ToastProvider";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "TinyTwinkles",
  description: "Created by me (kaustubh) for my cutiiieessss",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
