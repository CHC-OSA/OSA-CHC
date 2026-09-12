import { Outlet, useLocation } from "react-router";
import Nav from "./Nav";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div style={{ background: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <ScrollToTop />
      <Nav />
      <main style={{ paddingTop: isHome ? 0 : 76 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
