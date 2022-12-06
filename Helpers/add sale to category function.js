function addSale(shortname, quantity, percentage, reason) {
let categoryIndex = productData.findIndex(x => x.shortname == shortname);
let emptyIndexes = [];
let selectedIndexes = [];
for(let i = 0; i < productData[categoryIndex].products.length; i++) {
    if(productData[categoryIndex].products[i].salePercentage == 0) {
        emptyIndexes.push(i);
    }
}

if(emptyIndexes.length < quantity) {
    console.log("Not enough empty products!");
    return -1;
}

for(let j = 0; j < quantity; j++) {
let randomIndex = Math.floor(Math.random() *  emptyIndexes.length);
selectedIndexes.push(emptyIndexes[randomIndex]);
emptyIndexes.splice(randomIndex, 1);
}

console.log("Selected product indexes are : ");
console.log(selectedIndexes);

for(let k = 0; k < selectedIndexes.length; k++) {
productData[categoryIndex].products[selectedIndexes[k]].salePercentage = percentage;
productData[categoryIndex].products[selectedIndexes[k]].saleReason = reason;
}
}