export default () => {
  let storedItems = JSON.parse(localStorage.getItem("ertuway-orders")) || [];

  storedItems = storedItems.filter((eachOrder) => {
    return (
      eachOrder != null &&
      typeof eachOrder === "object" &&
      Object.hasOwnProperty.bind(eachOrder)("orderNumber") &&
      Object.hasOwnProperty.bind(eachOrder)("orderDateTime") &&
      Object.hasOwnProperty.bind(eachOrder)("payment") &&
      Object.hasOwnProperty.bind(eachOrder)("address") &&
      Object.hasOwnProperty.bind(eachOrder)("user") &&
      Object.hasOwnProperty.bind(eachOrder)("products")
    );
  });

  return storedItems;
};
