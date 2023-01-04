import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import LoginPage from "../components/LoginPage.js";
import { FilterProvider } from "../contexts/filterContext.js";
import { AuthProvider } from "../contexts/authContext";
import OrdersPage from "../components/OrdersPage.js";

export default function Orders() {
  return (
    <>
      <AuthProvider>
        <FilterProvider>
          <PageContent>
            <Navbar root="account" />
            <MobileMenu root="account" />
            <OrdersPage />
            <ContactUs />
            <Footer />
          </PageContent>
        </FilterProvider>
      </AuthProvider>
    </>
  );
}
