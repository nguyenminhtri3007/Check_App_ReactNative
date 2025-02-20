import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Thống Kê</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default StatsScreen;