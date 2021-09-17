var faker = require("faker");
const fs = require("fs");
// set locale to use vn
faker.locale = "vi";

const randomCategoryList = (n) => {
  const result = [];

  if (n <= 0) return [];
  else {
    for (let i = 0; i < n; i++) {
      const obj = {
        id: faker.random.uuid(),
        name: faker.commerce.department(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      result.push(obj);
    }
  }

  return result;
};

const randomProductList = (categoryList, numberOfProduct) => {
  const result = [];

  if (numberOfProduct <= 0) return [];

  for (const item of categoryList) {
    for (let i = 0; i < numberOfProduct; i++) {
      const obj = {
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        color: faker.commerce.color(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        categoryId: item.id,
      };

      result.push(obj);
    }
  }

  return result;
};

// IIFE
(() => {
  // random data
  const categoryList = randomCategoryList(4);
  const productList = randomProductList(categoryList, 5);

  // db object

  const db = {
    categories: categoryList,
    products: productList,
    profile: {
      name: "Sang",
    },
  };

  // write db object to db.json
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("generate data successfully!");
  });
})();
