function priceFormat(myNumber) {
    return myNumber.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      useGrouping: false,
    });
  }
  
  export default priceFormat;
  