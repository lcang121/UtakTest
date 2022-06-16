import fireDb from "../firebase";

export const createCategory = (category) => {
  return (
    fireDb.child("Categories").push({
      categoryName: category,
    }),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
};

export const updateCategory = (categoryName, id) => {
  return (
    fireDb.child(`Categories/${id}`).set({
      categoryName: categoryName,
    }),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
};

export const removeCategory = (id) => {
  return fireDb.child(`Categories/${id}`).remove((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
};

export const updateProduct = (productInfo, categoryId) => {
  return (
    fireDb.child(`Categories/${categoryId}/products/`).set(productInfo),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
};

export const updateProductChild = (productInfo, categoryId) => {
  return (
    fireDb.child(`Categories/${categoryId}/products/`).set(productInfo),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
};
