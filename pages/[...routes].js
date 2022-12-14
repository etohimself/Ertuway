import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import { ProductProvider } from "../contexts/productContext";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import CategoryPage from "../components/CategoryPage.js";
import { useRouter } from "next/router";
import { FilterProvider } from "../contexts/filterContext.js";

export default function Home() {
  //const router = useRouter();
  //const { routes } = router.query;

  return (
    <>
      <ProductProvider>
        <FilterProvider>
          <PageContent>
            <Navbar />
            <MobileMenu />
            <CategoryPage />
            <ContactUs />
            <Footer />
          </PageContent>
        </FilterProvider>
      </ProductProvider>
    </>
  );
}
