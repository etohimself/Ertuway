import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import { ProductProvider } from "../contexts/productContext";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import LoginPage from "../components/LoginPage.js";
import { FilterProvider } from "../contexts/filterContext.js";
import { PageProvider } from "../contexts/pageContext.js";

export default function Login() {
  //const router = useRouter();
  //const { routes } = router.query;

  return (
    <>
      <PageProvider>
        <ProductProvider>
          <FilterProvider>
            <PageContent>
              <Navbar root="login" />
              <MobileMenu />
              <LoginPage />
              <ContactUs />
              <Footer />
            </PageContent>
          </FilterProvider>
        </ProductProvider>
      </PageProvider>
    </>
  );
}
