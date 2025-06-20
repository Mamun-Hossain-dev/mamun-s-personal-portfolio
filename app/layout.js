import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://tanzil-portfolio-main.vercel.app"),
  title: "Tanzil Hossain - Digital Marketing Expert",
  description:
    "Tanzil Hossain's portfolio showcasing expertise in Facebook Marketing, Google Marketing, Web Analytics, and Social Media Marketing. Let's start a conversation about your project.",
  keywords: [
    "Tanzil Hossain",
    "Digital Marketing",
    "SEO",
    "Facebook Marketing",
    "Google Marketing",
    "Web Analytics",
    "Social Media Marketing",
    "Portfolio",
  ],
  openGraph: {
    title: "Tanzil Hossain - Digital Marketing Expert",
    description:
      "Expert in driving growth through digital marketing strategies.",
    url: "https://tanzil-portfolio-main.vercel.app",
    siteName: "Tanzil Hossain Portfolio",
    images: [
      {
        url: "/images/Tanzilhossain.jpg",
        width: 800,
        height: 600,
        alt: "Tanzil Hossain Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanzil Hossain - Digital Marketing Expert",
    description:
      "Expert in driving growth through digital marketing strategies.",
    creator: "@mdtanjilhosain",
    images: ["/images/Tanzilhossain.jpg"],
  },
};

export default function RootLayout({ children }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
