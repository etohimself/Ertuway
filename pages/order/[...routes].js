import PageContent from "../../components/PageContent.js";
import Navbar from "../../components/Navbar.js";
import MobileMenu from "../../components/MobileMenu.js";
import ContactUs from "../../components/ContactUs.js";
import Footer from "../../components/Footer.js";
import { FilterProvider } from "../../contexts/filterContext.js";
import SuccessPage from "../../components/SuccessPage";
import { AuthProvider } from "../../contexts/authContext.js";

export default function Seller() {
  return (
    <>
      <AuthProvider>
        <FilterProvider>
          <PageContent>
            <Navbar root="success" />
            <MobileMenu root="cart" />
            <SuccessPage />
            <ContactUs />
            <Footer />
          </PageContent>
        </FilterProvider>
      </AuthProvider>
    </>
  );
}
