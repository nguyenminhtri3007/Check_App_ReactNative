import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }: any) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("sign-in");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require("../../../../../assets/images/logoapp.png")}
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    logo: {
        width: 420,
        height: 900
    },
});

export default SplashScreen;
