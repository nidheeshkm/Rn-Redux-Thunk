import Product from "../../model/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
  return async (dispatch) => {
    // dispatch({ type: SET_PRODUCT, products: [] });
    console.log("start in fetch products");
    try {
      const response = await fetch(
        "https://nkmtek-8e927-default-rtdb.firebaseio.com/products.json"
      );
      console.log("response in fetch products", response);
      const resData = await response.json();
      console.log("Response", resData);
      const loadedProduct = [];
      for (const key in resData) {
        loadedProduct.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCT, payload: loadedProduct });
    } catch (err) {
      console.log("error in fetch products", err);
    }
  };
};

export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, payload: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://nkmtek-8e927-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await response.json();
    //console.log(resData);
    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: resData.name,
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      id: id,
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    },
  };
};
