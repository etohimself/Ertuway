import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import Welcomer from "../components/Welcomer.js";
import styles from "../styles/Home.module.css";
import DiscountCategories from "../components/DiscountCategories.js";
import ScrollArrow from "../components/ScrollArrow";
import { ProductProvider } from "../contexts/productContext";
import ProductItem from "../components/ProductItem";
import TestList from "../components/TestList";

export default function Home() {
  return (
    <>
      <ProductProvider>
        <PageContent>
          <Navbar />
          <MobileMenu />
          <Welcomer />
          <DiscountCategories
            title="Save Up to %30 on Gifts for Your Mom"
            event="momsday"
          />
          <DiscountCategories
            title="Saturday Electronics Sale, Up to %25 on Limited Items"
            event="saturdaysale"
          />
          <TestList />
        </PageContent>
      </ProductProvider>
    </>
  );
}
