import styles from "../styles/Navbar.module.css";
import BrandLogo from "./BrandLogo";
import UserIcon from "./Icons/UserIcon";
import CartIcon from "./Icons/CartIcon";
import SearchBox from "./SearchBox";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import SpinIcon from "./Icons/SpinIcon";
import { AuthContext } from "../contexts/authContext";
import { FilterContext } from "../contexts/filterContext";
import CancelIcon from "./Icons/CancelIcon";

function Navbar(props) {
  const [dataFetched, setDataFetched] = useState(0);
  const [pageList, setPageList] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const router = useRouter();
  const [showDropdown, setShowdropdown] = useState("");
  const { authData } = useContext(AuthContext);
  const { mobileMenuVisibility, setMobileMenuVisibility } =
    useContext(FilterContext);

  function handleCategoryClick(shortname) {
    if (shortname == "index") {
      router.push("/");
    } else if (shortname == "bestsellers") {
      router.push("/bestsellers");
    } else if (shortname == "bestdeals") {
      router.push("/bestdeals");
    } else {
      router.push("/category/" + shortname);
    }
  }

  function handleSubcategoryClick(maincategory, subcategory) {
    router.push(
      "/category/" +
        maincategory +
        "/" +
        subcategory.split(maincategory + "_")[1]
    );
  }

  function validCategory(catName) {
    return mainCategories.indexOf(catName) > -1;
  }

  function handleMobileMenuClick(x) {
    handleCategoryClick(x.shortname);
    setMobileMenuVisibility(0);
  }

  useEffect(() => {
    //Detect the current page, underline current page
    if (props.root == "") {
      setCurrentPage("index");
    } else if (props.root == "category") {
      if (!router.isReady) return;
      if (router.query && router.query.routes && router.query.routes.length) {
        setCurrentPage(router.query.routes[0]);
      }
    } else if (props.root == "product") {
    } else {
      setCurrentPage(props.root);
    }
  }, [router, props.root]);

  useEffect(() => {
    let pagelistAPI = `${location.protocol}//${location.hostname}:27469/pagelist`;
    let maincategoryAPI = `${location.protocol}//${location.hostname}:27469/maincategories`;
    let subcategoryAPI = `${location.protocol}//${location.hostname}:27469/subcategories`;

    fetch(pagelistAPI)
      .then((res) => res.json())
      .then((data) => {
        setPageList(data);
      })
      .catch((err) => console.log(err));

    fetch(maincategoryAPI)
      .then((res) => res.json())
      .then((data) => {
        setMainCategories(data);
      })
      .catch((err) => console.log(err));

    fetch(subcategoryAPI)
      .then((res) => res.json())
      .then((data) => {
        setSubCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (pageList.length && mainCategories.length && subCategories.length) {
      if (pageList[0].shortname && subCategories[0].categoryName) {
        //data seems valid
        setDataFetched(1);
      }
    }
  }, [pageList, mainCategories, subCategories]);

  return (
    <>
      <div className={styles.NavbarContainer}>
        <div className={styles.BrandAreaMobile}>
          <BrandLogo text="Ertuway" />
          <div className={styles.NavbarButtonsContainerMobile}>
            <div
              className={styles.AccountButton}
              onClick={() => authData <= 0 && router.push("/login")}
            >
              <UserIcon className={styles.navbarButtonIcons} />
              {authData.username ? `My Account` : `Sign In`}
            </div>
            <div
              className={`${styles.CartButton} ${
                props.root == "cart" && styles.cartActive
              }`}
              onClick={() => router.push("/cart")}
            >
              <CartIcon
                className={`${styles.navbarButtonIcons} ${
                  props.root == "cart" && styles.cartActive
                }`}
              />
              My Cart
            </div>
          </div>
        </div>

        <SearchBox loading={!dataFetched} />
        <div className={styles.NavbarButtonsContainer}>
          <div
            className={styles.AccountButton}
            onClick={() => authData <= 0 && router.push("/login")}
          >
            <UserIcon className={styles.navbarButtonIcons} />
            {authData.username ? `My Account` : `Sign In`}
          </div>
          <div
            className={`${styles.CartButton} ${
              props.root == "cart" && styles.cartActive
            }`}
            onClick={() => router.push("/cart")}
          >
            <CartIcon
              className={`${styles.navbarButtonIcons} ${
                props.root == "cart" && styles.cartActive
              }`}
            />
            My Cart
          </div>
        </div>
      </div>

      <div className={styles.NavbarCategories}>
        <div className={styles.NavbarCategoryItems}>
          {dataFetched ? (
            pageList.map((x, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handleCategoryClick(x.shortname)}
                  className={`${styles.NavbarCategory} ${
                    currentPage == x.shortname && styles.isActive
                  }`}
                  onMouseOver={() =>
                    validCategory(x.shortname) && setShowdropdown(x.shortname)
                  }
                  onMouseLeave={() => setShowdropdown("")}
                  style={{
                    zIndex:
                      showDropdown.length > 0 && showDropdown == x.shortname
                        ? 100
                        : 0,
                  }}
                >
                  <span>{x.title}</span>

                  <div
                    className={styles.NavbarDropdownContainer}
                    style={
                      showDropdown.length > 0 && showDropdown == x.shortname
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                  >
                    {validCategory(x.shortname) &&
                      subCategories
                        .filter((cat) => cat.maincategory == x.shortname)
                        .sort((a, b) =>
                          b.categoryName < a.categoryName ? -1 : 1
                        )
                        .map((subcat, i) => (
                          <p
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubcategoryClick(
                                x.shortname,
                                subcat.shortname
                              );
                              setShowdropdown("");
                            }}
                          >
                            {subcat.categoryName}
                          </p>
                        ))}
                  </div>
                </div>
              );
            })
          ) : (
            <SpinIcon className={styles.spinner} />
          )}
        </div>
      </div>
      <div
        className={styles.screenOverlay}
        style={
          showDropdown.length > 0 ? { display: "block" } : { display: "none" }
        }
      />

      <div
        className={`${styles.mobileMenuContainer} ${
          mobileMenuVisibility && styles.mobileMenuVisible
        }`}
      >
        <div
          className={`${styles.mobileMenuButton} ${styles.mobileMenuTitle}`}
          onClick={() => setMobileMenuVisibility(0)}
        >
          <p>Categories</p>
          <CancelIcon className={styles.mobileMenuCloseBtn} />
        </div>
        {pageList.map((x, i) => {
          return (
            <div
              key={i}
              className={`${styles.mobileMenuButton}`}
              onClick={() => handleMobileMenuClick(x)}
            >
              <p>{x.title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Navbar;
