import PageContent from "../../components/PageContent.js";
import Navbar from "../../components/Navbar.js";
import MobileMenu from "../../components/MobileMenu.js";
import ContactUs from "../../components/ContactUs.js";
import Footer from "../../components/Footer.js";
import { FilterProvider } from "../../contexts/filterContext.js";
import EventPage from "../../components/EventPage.js";
import { AuthProvider } from "../../contexts/authContext.js";

export default function SpecialEventPage() {
  return (
    <>
      <AuthProvider>
        <FilterProvider>
          <PageContent>
            <Navbar root="special" />
            <MobileMenu />
            <EventPage />
            <ContactUs />
            <Footer />
          </PageContent>
        </FilterProvider>
      </AuthProvider>
    </>
  );
}
