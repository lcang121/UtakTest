import fireDb from "../firebase";
// import { useContext } from "react";
// import { BookContext } from "../context/BookContext";

const emptyCategory = {
  categoryName: "",
  product: "",
  price: 0,
  cost: 0,
  stock: 0,
};

export const createCategory = (category) => {
  //   const [books] = useContext(BookContext);
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
  //   const [books] = useContext(BookContext);
  return fireDb.child(`Categories/${id}`).remove((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  });
};

export const createProduct = (productInfo, categoryID) => {
  console.log(productInfo);
  //   const [books] = useContext(BookContext);
  return (
    fireDb.child(`Categories/${categoryID}/products/`).push(productInfo),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    }
  );
};

// export const updateTable = (categoryName, id) => {
//   console.log(categoryName);
//   //   const [books] = useContext(BookContext);
//   return (
//     fireDb.child(`Categories/${id}/products/${productName}`).set({
//       categoryName: categoryName,
//     }),
//     (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("success");
//       }
//     }
//   );
// };
