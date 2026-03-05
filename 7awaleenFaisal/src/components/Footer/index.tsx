import React from "react";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-white/5">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between pt-20 pb-16">
          {/* Help & Support Column */}
          <div className="max-w-[330px] w-full">
            <h2 className="mb-8 text-lg font-bold text-dark dark:text-white">
              الدعم والمساعدة
            </h2>

            <ul className="flex flex-col gap-4">
              <li className="flex gap-4 items-start text-sm text-gray-600 dark:text-gray-400">
                <span className="flex-shrink-0 p-2 bg-blue/5 rounded-lg text-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>المملكة العربية السعودية، الرياض، شارع الملك فهد</span>
              </li>

              <li className="flex gap-4 items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="flex-shrink-0 p-2 bg-emerald-500/5 rounded-lg text-emerald-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span>(+966) 50 123 4567</span>
              </li>

              <li className="flex gap-4 items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="flex-shrink-0 p-2 bg-blue/5 rounded-lg text-blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span>support@7awaleenfaisal.com</span>
              </li>
            </ul>

            <div className="flex items-center gap-4 mt-10">
              {['Facebook', 'Twitter', 'Instagram', 'Linkedin'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/5 hover:bg-blue hover:text-white transition-all duration-300"
                  aria-label={social}
                >
                  <span className="font-bold text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Account Column */}
          <div className="w-full sm:w-auto">
            <h2 className="mb-8 text-lg font-bold text-dark dark:text-white">
              الحساب
            </h2>

            <ul className="flex flex-col gap-4">
              {[
                { name: 'حسابي', path: '/my-account' },
                { name: 'تسجيل الدخول', path: '/signin' },
                { name: 'السلة', path: '/cart' },
                { name: 'المفضلة', path: '/wishlist' },
                { name: 'المتجر', path: '/shop-with-sidebar' }
              ].map((link, i) => (
                <li key={i}>
                  <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue transition-colors" href={link.path}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="w-full sm:w-auto">
            <h2 className="mb-8 text-lg font-bold text-dark dark:text-white">
              روابط سريعة
            </h2>

            <ul className="flex flex-col gap-4">
               {['سياسة الخصوصية', 'سياسة الاستبدال', 'شروط الاستخدام', 'الأسئلة الشائعة', 'اتصل بنا'].map((link, i) => (
                <li key={i}>
                  <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue transition-colors" href="#">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download Column */}
          <div className="w-full sm:w-auto lg:max-w-xs">
            <h2 className="mb-8 text-lg font-bold text-dark dark:text-white">
              تحميل التطبيق
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              وفر 3$ مع التطبيق للمستخدمين الجدد فقط
            </p>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-3 px-5 py-3 bg-dark dark:bg-white text-white dark:text-dark rounded-xl hover:scale-105 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.24 16.3 3.4 10.3 6.13 6.35c1.4-2 3.25-2.19 4.67-1.34 1.15.58 2.37.58 3.53 0 1.07-.48 2.87-.78 4.22.62-3.13 3.65-2.58 8.16.5 10.65zM14.97 4.14C14.4 5.3 12.9 6.2 11.66 6.12c-.17-1.36.4-2.8 1.4-3.7 1-.95 2.53-1.4 3.65-1.4 0 1.25-.45 2.45-1.74 3.12z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-60">Available on</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 px-5 py-3 bg-blue text-white rounded-xl hover:scale-105 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.25 1.75l10.5 10.5L3.25 22.75v-21zM15 13.5l3.25 3.25L23 12.5 15 8.5v5zM5.5 24l10.5-6L23 12.5 5.5 2z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-60">GET IT ON</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="py-8 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {year} حوّالين فيصل. جميع الحقوق محفوظة
            </p>

            <div className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
               <Image
                    src="/images/payment/payment-01.svg"
                    alt="visa"
                    width={40}
                    height={20}
                  />
                  <Image
                    src="/images/payment/payment-02.svg"
                    alt="paypal"
                    width={40}
                    height={20}
                  />
                  <Image
                    src="/images/payment/payment-03.svg"
                    alt="mastercard"
                    width={40}
                    height={20}
                  />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
