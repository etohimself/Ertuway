import ProductItem from "../components/ProductItem.js";
import styles from "../styles/Home.module.css";
import productImages from "../Helpers/productImages";

export default function Home() {
  var dummyProducts = [
    {
      productName: "Product Name",
      price: 160,
      oldPrice: 200,
    },
    {
      productName: "Product Name",
      price: 340,
      oldPrice: 425,
    },
    {
      productName: "Product Name",
      price: 121,
      oldPrice: 151.25,
    },
    {
      productName: "Product Name",
      price: 324,
      oldPrice: 405,
    },
    {
      productName: "Product Name",
      price: 355,
      oldPrice: 443.75,
    },
    {
      productName: "Product Name",
      price: 263,
      oldPrice: 328.75,
    },
    {
      productName: "Product Name",
      price: 326,
      oldPrice: 407.5,
    },
    {
      productName: "Product Name",
      price: 138,
      oldPrice: 172.5,
    },
    {
      productName: "Product Name",
      price: 357,
      oldPrice: 446.25,
    },
    {
      productName: "Product Name",
      price: 304,
      oldPrice: 380,
    },
    {
      productName: "Product Name",
      price: 332,
      oldPrice: 415,
    },
    {
      productName: "Product Name",
      price: 209,
      oldPrice: 261.25,
    },
    {
      productName: "Product Name",
      price: 155,
      oldPrice: 193.75,
    },
    {
      productName: "Product Name",
      price: 293,
      oldPrice: 366.25,
    },
    {
      productName: "Product Name",
      price: 107,
      oldPrice: 133.75,
    },
    {
      productName: "Product Name",
      price: 216,
      oldPrice: 270,
    },
    {
      productName: "Product Name",
      price: 378,
      oldPrice: 472.5,
    },
    {
      productName: "Product Name",
      price: 318,
      oldPrice: 397.5,
    },
    {
      productName: "Product Name",
      price: 179,
      oldPrice: 223.75,
    },
    {
      productName: "Product Name",
      price: 310,
      oldPrice: 387.5,
    },
    {
      productName: "Product Name",
      price: 137,
      oldPrice: 171.25,
    },
    {
      productName: "Product Name",
      price: 275,
      oldPrice: 343.75,
    },
    {
      productName: "Product Name",
      price: 334,
      oldPrice: 417.5,
    },
    {
      productName: "Product Name",
      price: 333,
      oldPrice: 416.25,
    },
    {
      productName: "Product Name",
      price: 130,
      oldPrice: 162.5,
    },
    {
      productName: "Product Name",
      price: 310,
      oldPrice: 387.5,
    },
    {
      productName: "Product Name",
      price: 308,
      oldPrice: 385,
    },
    {
      productName: "Product Name",
      price: 324,
      oldPrice: 405,
    },
    {
      productName: "Product Name",
      price: 190,
      oldPrice: 237.5,
    },
    {
      productName: "Product Name",
      price: 175,
      oldPrice: 218.75,
    },
    {
      productName: "Product Name",
      price: 139,
      oldPrice: 173.75,
    },
    {
      productName: "Product Name",
      price: 138,
      oldPrice: 172.5,
    },
    {
      productName: "Product Name",
      price: 113,
      oldPrice: 141.25,
    },
    {
      productName: "Product Name",
      price: 309,
      oldPrice: 386.25,
    },
    {
      productName: "Product Name",
      price: 391,
      oldPrice: 488.75,
    },
    {
      productName: "Product Name",
      price: 394,
      oldPrice: 492.5,
    },
    {
      productName: "Product Name",
      price: 396,
      oldPrice: 495,
    },
    {
      productName: "Product Name",
      price: 248,
      oldPrice: 310,
    },
    {
      productName: "Product Name",
      price: 374,
      oldPrice: 467.5,
    },
    {
      productName: "Product Name",
      price: 200,
      oldPrice: 250,
    },
  ];

  dummyProducts = dummyProducts.map((x, i) => ({
    ...x,
    image: productImages[i % 11],
  }));

  return (
    <div className={styles.pageContent}>
      <div className={styles.productsContainer}>
        {dummyProducts.map((currentItem, index) => {
          return (
            <ProductItem
              price={currentItem.price}
              oldPrice={currentItem.oldPrice}
              productName={currentItem.productName}
              key={index}
              image={currentItem.image}
            />
          );
        })}
      </div>
    </div>
  );
}
