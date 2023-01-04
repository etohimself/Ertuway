export default () => {
  let storedItems = JSON.parse(localStorage.getItem("ertuway-wishlist")) || [];

  storedItems = storedItems.filter((eachOrder) => {
    return (
      eachOrder != null &&
      typeof eachOrder === "object" &&
      Object.hasOwnProperty.bind(eachOrder)("id")
    );
  });

  return storedItems;
};
