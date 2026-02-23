import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="grain-overlay flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      {/* Brevo Conversations widget is loaded via index.html <head> script
          so it persists across all route changes without React lifecycle dependency */}
    </div>
  );
};

export default Layout;
