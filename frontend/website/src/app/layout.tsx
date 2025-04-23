import { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import * as React from 'react';

import '@/styles/globals.css';

import { StoreProvider } from '@/app/StoreProvider';
import { siteConfig } from '@/configs/site';

export const viewport: Viewport = {
  themeColor: { media: '(prefers-color-scheme: light)', color: '#EF233C' },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    // default: siteConfig.title,
    absolute: siteConfig.main_title,
    // template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.application_name,
  alternates: { canonical: siteConfig.url },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.main_title,
    description: siteConfig.description,
    siteName: siteConfig.main_title,
    images: [
      {
        url: `${siteConfig.url}/images/og.jpg`,
        alt: siteConfig.title,
      },
    ],
    locale: 'fa_IR',
    phoneNumbers: siteConfig.phoneNumbers,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.main_title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/og.jpg`,
        alt: siteConfig.title,
      },
    ],
  },
};

const iransans = localFont({
  src: [
    {
      path: '../../public/fonts/iransans/iransans_black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/iransans/iransans_bold.ttf',
      weight: 'bold',
      style: 'normal',
    },
    {
      path: '../../public/fonts/iransans/iransans_medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/iransans/iransans_light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/iransans/iransans_ultralight.ttf',
      weight: '200',
      style: 'normal',
    },
  ],
  variable: '--font-iransans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      dir='rtl'
      data-theme='light'
      className={`${iransans.variable} font-sans`}
    >
      <body>
        <StoreProvider>
          <div>{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
