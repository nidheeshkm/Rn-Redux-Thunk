import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";
import * as ProductActions from "../../store/actions/products";
import { sub } from "react-native-reanimated";

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const prodId = props.navigation.getParam("productId");
  const prodTitle = props.navigation.getParam("title");
  const prodDescription = props.navigation.getParam("description");
  const prodImageUrl = props.navigation.getParam("imagUrl");
  const prodPrice = props.navigation.getParam("price");

  const editedProduct = useSelector((state) =>
    state.products.userProducts.filter((prod) => prod.id === prodId)
  );

  const [title, setTitle] = useState(prodTitle ? prodTitle : "");
  const [image, setImage] = useState(prodImageUrl ? prodImageUrl : "");
  const [price, setPrice] = useState(prodPrice ? prodPrice : "");
  const [description, setDescription] = useState(
    prodDescription ? prodDescription : ""
  );
  const submitHandler = useCallback(() => {
    if (prodId) {
      console.log(
        "updating....",
        prodId +
          "--" +
          title +
          "--" +
          description +
          "---" +
          image +
          "---" +
          price
      );
      dispatch(
        ProductActions.updateProduct(prodId, title, description, image, price)
      );
    } else {
      dispatch(ProductActions.createProduct(title, description, image, +price));
    }
  }, [dispatch, prodId, title, description, image, price]);
  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={(text) => setImage(text)}
          />
        </View>
        {prodId ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};
EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productID")
      ? "Edit Products"
      : "Add Products",

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  label: { marginVertical: 8 },
});
export default EditProductScreen;
