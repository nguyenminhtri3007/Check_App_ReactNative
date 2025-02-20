import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NewsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Bảng Tin</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewsScreen;