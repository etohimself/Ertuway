import PageContent from "../../components/PageContent";
import Navbar from "../../components/Navbar.js";
import MobileMenu from "../../components/MobileMenu.js";
import { ProductProvider } from "../../contexts/productContext";
import ContactUs from "../../components/ContactUs.js";
import CategoryPage from "../../components/CategoryPage.js";
import Footer from "../../components/Footer.js";
import { FilterProvider } from "../../contexts/filterContext.js";
import { PageProvider } from "../../contexts/pageContext.js";

export default function Home() {
  return (
    <>
      <PageProvider>
        <ProductProvider>
          <FilterProvider>
            <PageContent>
              <Navbar root="category" />
              <MobileMenu />
              <CategoryPage />
              <ContactUs />
              <Footer />
            </PageContent>
          </FilterProvider>
        </ProductProvider>
      </PageProvider>
    </>
  );
}
