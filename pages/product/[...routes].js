import PageContent from "../../components/PageContent.js";
import Navbar from "../../components/Navbar.js";
import MobileMenu from "../../components/MobileMenu.js";
import { ProductProvider } from "../../contexts/productContext";
import ContactUs from "../../components/ContactUs.js";
import Footer from "../../components/Footer.js";
import { FilterProvider } from "../../contexts/filterContext.js";
import ProductPage from "../../components/ProductPage";
import { PageProvider } from "../../contexts/pageContext.js";

export default function Seller() {
  return (
    <>
      <PageProvider>
        <ProductProvider>
          <FilterProvider>
            <PageContent>
              <Navbar root="product" />
              <MobileMenu />
              <ProductPage />
              <ContactUs />
              <Footer />
            </PageContent>
          </FilterProvider>
        </ProductProvider>
      </PageProvider>
    </>
  );
}
