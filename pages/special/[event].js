import PageContent from "../../components/PageContent.js";
import Navbar from "../../components/Navbar.js";
import MobileMenu from "../../components/MobileMenu.js";
import { ProductProvider } from "../../contexts/productContext";
import ContactUs from "../../components/ContactUs.js";
import Footer from "../../components/Footer.js";
import { FilterProvider } from "../../contexts/filterContext.js";
import EventPage from "../../components/EventPage.js";
import CategoryPage from "../../components/CategoryPage";
import { PageProvider } from "../../contexts/pageContext.js";

export default function SpecialEventPage() {
  return (
    <>
      <PageProvider>
        <ProductProvider>
          <FilterProvider>
            <PageContent>
              <Navbar root="special" />
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
