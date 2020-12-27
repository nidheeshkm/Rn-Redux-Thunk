import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
const ProductDetailScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("ProductID");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};
ProductDetailScreen.navigationOptions = (navData) => {
  return { headerTitle: navData.navigation.getParam("ProductTitle") };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 20,
    color: "#888",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
export default ProductDetailScreen;
