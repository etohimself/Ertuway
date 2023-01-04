import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import { FilterProvider } from "../contexts/filterContext.js";
import { AuthProvider } from "../contexts/authContext";
import WishlistPage from "../components/WishlistPage.js";

export default function Wishlist() {
  return (
    <>
      <AuthProvider>
        <FilterProvider>
          <PageContent>
            <Navbar root="account" />
            <MobileMenu root="account" />
            <WishlistPage />
            <ContactUs />
            <Footer />
          </PageContent>
        </FilterProvider>
      </AuthProvider>
    </>
  );
}
