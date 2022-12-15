import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import { ProductProvider } from "../contexts/productContext";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import { FilterProvider } from "../contexts/filterContext.js";

export default function BestSellers() {
  return (
    <>
      <ProductProvider>
        <FilterProvider>
          <PageContent>
            <Navbar root="bestsellers" />
            <MobileMenu />
            <h1>Best Sellers Page</h1>
            <ContactUs />
            <Footer />
          </PageContent>
        </FilterProvider>
      </ProductProvider>
    </>
  );
}
