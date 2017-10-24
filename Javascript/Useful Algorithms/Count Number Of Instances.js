//COUNT NUMBER OF INSTANCES OF EACH ITEM IN AN ARRAY

// 8. Reduce Exercise
// Sum up the instances of each of these
//again need to have a starting total with an initial value
//in this case a blank object: {}
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

const transportation = data.reduce((obj, item) => {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});
console.log(transportation);
