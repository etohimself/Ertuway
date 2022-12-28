import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import CheckoutPage from "../components/CheckoutPage.js";
import { FilterProvider } from "../contexts/filterContext.js";
import { AuthProvider } from "../contexts/pageContext.js";

export default function Checkout() {
  return (
    <>
      <AuthProvider>
          <FilterProvider>
            <PageContent>
              <Navbar root="checkout" />
              <MobileMenu />
              <CheckoutPage />
              <ContactUs />
              <Footer />
            </PageContent>
          </FilterProvider>
      </AuthProvider>
    </>
  );
}
