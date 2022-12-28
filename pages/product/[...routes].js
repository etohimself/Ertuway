import PageContent from "../../components/PageContent.js";
import Navbar from "../../components/Navbar.js";
import MobileMenu from "../../components/MobileMenu.js";
import ContactUs from "../../components/ContactUs.js";
import Footer from "../../components/Footer.js";
import { FilterProvider } from "../../contexts/filterContext.js";
import ProductPage from "../../components/ProductPage";
import { AuthProvider } from "../../contexts/authContext.js";

export default function Seller() {
  return (
    <>
      <AuthProvider>
          <FilterProvider>
            <PageContent>
              <Navbar root="product" />
              <MobileMenu />
              <ProductPage />
              <ContactUs />
              <Footer />
            </PageContent>
          </FilterProvider>
      </AuthProvider>
    </>
  );
}
