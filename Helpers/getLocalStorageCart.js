export default () => {
  let storedItems = JSON.parse(localStorage.getItem("ertuway-cart")) || [];

  storedItems = storedItems.filter((eachOrder) => {
    return (
      eachOrder != null &&
      typeof eachOrder === "object" &&
      Object.hasOwnProperty.bind(eachOrder)("id") &&
      Object.hasOwnProperty.bind(eachOrder)("seller") &&
      Object.hasOwnProperty.bind(eachOrder)("options") &&
      Object.hasOwnProperty.bind(eachOrder)("count") &&
      eachOrder.count >= 0 &&
      eachOrder.count <= 10 &&
      eachOrder.seller >= 0 &&
      eachOrder.seller <= 9
    );
  });

  return storedItems;
};