"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { useState, useEffect, useMemo } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/[id]/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";

import { Toaster } from "react-hot-toast";
import BuyNowModal from "@/components/Common/BuyNowModal";
import { BuyNowProvider } from "../context/BuyNowContext";
import WhatsApp from "@/components/Common/WhatsApp";
import Snowfall from "react-snowfall";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const images = useMemo(() => {
    // const moon = new Image();
    // moon.src = "/images/ramaden/moon.svg";

    const ramez = new Image();
    ramez.src = "/images/ramaden/ramez.png";
    const karam = new Image();
    karam.src = "/images/ramaden/karam.jpg";

    return [ramez, karam];
  }, []);
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning={true}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        if (
          localStorage.theme === 'dark' ||
          (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      `,
          }}
        />
      </head>

      <body
        data-new-gr-c-s-check-loaded="14.1261.0"
        data-gr-ext-installed=""
        cz-shortcut-listen="true"
      >
        <Snowfall
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 100,
            pointerEvents: "none",
          }}
          snowflakeCount={40}
          color="#cbd5e1" // رمادي فاتح واضح
          speed={[1, 3]} // حركة مستمرة
          wind={[-0.5, 1]}
          images={images}
          radius={[60, 65]}
        />

        <>
          <ReduxProvider>
            <CartModalProvider>
              <ModalProvider>
                <BuyNowProvider>
                  <PreviewSliderProvider>
                    <Header />

                    {children}
                    <BuyNowModal />
                    <QuickViewModal />
                    <CartSidebarModal />
                    <PreviewSliderModal />
                  </PreviewSliderProvider>
                </BuyNowProvider>
              </ModalProvider>
            </CartModalProvider>
          </ReduxProvider>
          <ScrollToTop />
          <WhatsApp
            phoneNumber="201104998568"
            message="اهلا بيك في وصل معاك في اي استفسار"
          />
          <Footer />
          <Toaster />
        </>
      </body>
    </html>
  );
}
