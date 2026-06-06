import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import SmoothScroll from "@/components/site/SmoothScroll";
import Cursor from "@/components/site/Cursor";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <Cursor />
      <Navbar />
      {children}
      <Footer />
    </SmoothScroll>
  );
}
