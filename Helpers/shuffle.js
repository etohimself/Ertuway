const shuffleArr = (array) => {
  let myArray = [...array];
  for (var i = myArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = myArray[i];
    myArray[i] = myArray[j];
    myArray[j] = temp;
  }
  return myArray;
};

export default shuffleArr;