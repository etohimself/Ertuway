const calcPrice = (basePrice, availableOptions, selectedOptions) => {
  return availableOptions.reduce((acc, x, i) => {
    return x.affectsPrice == 1
      ? acc + acc * selectedOptions[i] * 0.1
      : x.affectsPrice == 2
      ? acc + acc * selectedOptions[i] * 0.7
      : acc;
  }, basePrice);
};

export default calcPrice;
