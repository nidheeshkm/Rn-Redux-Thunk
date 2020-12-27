import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => (
  <View style={styles.cartItem}>
    <Text style={styles.itemData}>
      <Text style={styles.quantity}>{props.quantity}</Text>
      <Text style={styles.title}>{props.title}</Text>
    </Text>
    <View style={styles.itemData}>
      <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
      {props.deletable && (
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 17,
    color: "#888",
  },
  amount: {
    fontSize: 17,
  },
  title: {
    fontSize: 17,
  },
  deleteButton: { marginLeft: 20 },
});

export default CartItem;
