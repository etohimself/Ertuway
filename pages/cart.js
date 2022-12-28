import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import CartPage from "../components/CartPage.js";
import { FilterProvider } from "../contexts/filterContext.js";
import { AuthProvider } from "../contexts/authContext";

export default function Cart() {
  //const router = useRouter();
  //const { routes } = router.query;

  return (
    <>
      <AuthProvider>
          <FilterProvider>
            <PageContent>
              <Navbar root="cart" />
              <MobileMenu />
              <CartPage />
              <ContactUs />
              <Footer />
            </PageContent>
          </FilterProvider>
      </AuthProvider>
    </>
  );
}
