import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

import { Item, HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductOverviewScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      console.log("dispatching fetch products");
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  }, [dispatch, setLoading]);
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);
  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);
  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      ProductID: id,
      ProductTitle: title,
    });
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};
ProductOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default ProductOverviewScreen;
