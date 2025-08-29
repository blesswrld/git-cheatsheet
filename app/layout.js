import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata = {
    title: "Интерактивная Git Шпаргалка",
    description: "Найди нужную команду Git быстро и легко",
    icons: {
        icon: [
            {
                url: "/favicon/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/favicon/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            {
                url: "/favicon/favicon-96x96.png",
                sizes: "96x96",
                type: "image/png",
            },
        ],
        apple: [
            { url: "/favicon/apple-icon-57x57.png", sizes: "57x57" },
            { url: "/favicon/apple-icon-60x60.png", sizes: "60x60" },
            { url: "/favicon/apple-icon-72x72.png", sizes: "72x72" },
            { url: "/favicon/apple-icon-76x76.png", sizes: "76x76" },
            { url: "/favicon/apple-icon-114x114.png", sizes: "114x114" },
            { url: "/favicon/apple-icon-120x120.png", sizes: "120x120" },
            { url: "/favicon/apple-icon-144x144.png", sizes: "144x144" },
            { url: "/favicon/apple-icon-152x152.png", sizes: "152x152" },
            { url: "/favicon/apple-icon-180x180.png", sizes: "180x180" },
        ],
    },
    manifest: "/favicon/manifest.json",
    other: {
        "msapplication-TileColor": "#000000", // Черный цвет для плитки Windows
        "msapplication-TileImage": "/favicon/ms-icon-144x144.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body
                className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
            >
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
