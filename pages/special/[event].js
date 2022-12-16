import PageContent from "../../components/PageContent.js";
import Navbar from "../../components/Navbar.js";
import MobileMenu from "../../components/MobileMenu.js";
import { ProductProvider } from "../../contexts/productContext";
import ContactUs from "../../components/ContactUs.js";
import Footer from "../../components/Footer.js";
import { FilterProvider } from "../../contexts/filterContext.js";
import EventPage from "../../components/EventPage.js";

export default function SpecialEventPage() {
  return (
    <>
      <ProductProvider>
        <FilterProvider>
          <PageContent>
            <Navbar root="special"/>
            <MobileMenu />
            <EventPage />
            <ContactUs />
            <Footer />
          </PageContent>
        </FilterProvider>
      </ProductProvider>
    </>
  );
}