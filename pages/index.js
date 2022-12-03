import PageContent from "../components/PageContent.js";
import Navbar from "../components/Navbar.js";
import MobileMenu from "../components/MobileMenu.js";
import Welcomer from "../components/Welcomer.js";
import styles from "../styles/Home.module.css";
import DiscountCategories from "../components/DiscountCategories.js";
import ScrollArrow from "../components/ScrollArrow";


export default function Home() {
  const event1list = [
    { title: "Kitchen Appliances", subcategory: "appliances", discount: 20 },
    {
      title: "Household Appliances",
      subcategory: "household-appliances",
      discount: 15,
    },
    { title: "Decorations", subcategory: "decoration", discount: 25 },
    { title: "Perfumes", subcategory: "perfumes", discount: 30 },
    { title: "Beauty Products", subcategory: "beautyproducts", discount: 30 },
    { title: "Skin Care Products", subcategory: "skinproducts", discount: 30 },
    { title: "Smartphones", subcategory: "smartphones", discount: 15 },
  ];

  const event2list = [
    { title: "Smartphones", subcategory: "smartphones", discount: 20 },
    {
      title: "Computers",
      subcategory: "computers",
      discount: 15,
    },
    { title: "Tablets", subcategory: "tablet", discount: 25 },
    { title: "Cameras", subcategory: "camera", discount: 30 },
    {
      title: "Household Appliances",
      subcategory: "household-appliances",
      discount: 30,
    },
    { title: "Televisions", subcategory: "tv", discount: 30 },
    { title: "Printers", subcategory: "printers", discount: 15 },
  ];

  return (
    <>
      <PageContent>
        <Navbar />
        <MobileMenu />
        <Welcomer />
        <DiscountCategories
          title="Save Up to %30 on Gifts for Your Mom"
          list={event1list}
        />
        <DiscountCategories
          title="Saturday Electronics Sale, Up to %25 on Limited Items"
          list={event2list}
        />
      </PageContent>
    </>
  );
}
