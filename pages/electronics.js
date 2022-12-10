import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import Welcomer from "../components/Welcomer.js";
import DiscountCategories from "../components/DiscountCategories.js";
import { ProductProvider } from "../contexts/productContext";
import ProductShortList from "../components/ProductShortList.js";
import ExploreCategories from "../components/ExploreCategories.js";
import ContactUs from "../components/ContactUs.js";
import Footer from "../components/Footer.js";
import CategoryPage from "../components/CategoryPage.js";

export default function Home() {
  return (
    <>
      <ProductProvider>
        <PageContent>
          <Navbar page="electronics"/>
          <MobileMenu />
          <CategoryPage page="electronics" title="Electronics"/>
          <ContactUs />
          <Footer />
        </PageContent>
      </ProductProvider>
    </>
  );
}
