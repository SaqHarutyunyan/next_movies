import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Movies Website",
    description:
        "A modern movies website built with Next.js, Tailwind CSS, and TypeScript",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex-grow  px-4">{children}</main>

                {/* Footer */}
                <Footer />
            </body>
        </html>
    );
}
