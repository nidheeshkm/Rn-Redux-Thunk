import React from "react";
import { FlatList, Text, View, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductScreen = (props) => {
  const products = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id, title, description, imagUrl, price) => {
    props.navigation.navigate("EditProduct", {
      productId: id,
      title: title,
      description: description,
      imagUrl: imagUrl,
      price: price,
    });
  };
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          image={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(
                itemData.item.id,
                itemData.item.title,
                itemData.item.description,
                itemData.item.imageUrl,
                itemData.item.price
              );
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};
UserProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Orders",
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
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductScreen;
