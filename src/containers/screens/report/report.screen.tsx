import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";

const Header = ({ navigation }: { navigation: any }) => {
    const handlePress = () => {
        navigation.navigate("create-report")
    };

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Chấm Công</Text>
            <TouchableOpacity style={styles.icon} onPress={() => handlePress()}>
                <Text style={styles.createText}>Tạo đơn báo</Text>
                <Image source={require("../../../../assets/icons/create.png")} style={styles.logo} />
            </TouchableOpacity>
        </View>
    );
};

const ListData = () => {
    const items = [
        { text: "Đi làm muộn" },
        { text: "Nghỉ phép 1 ngày" },
        { text: "Nghỉ phép 1/2 ngày (sáng)" },
        { text: "Nghỉ phép 1/2 ngày (chiều)" },
        { text: "Làm việc ở nhà" },
    ];

    return (
        <View style={styles.listData}>
            {items.map((item, index) => (
                <View key={index} style={[styles.item]}>
                    <Text style={styles.itemText}>{item.text}</Text>
                </View>
            ))}
        </View>
    );
};

const ReportScreen = (props: any) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ListData />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        height: 76,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#272E36",
    },
    icon: {
        flexDirection: "row",
        alignItems: "center",
    },
    createText: {
        fontSize: 16,
        color: "#FD4E20",
        marginRight: 8,
        fontWeight: "bold",
    },
    logo: {
        width: 24,
        height: 24,
    },
    listData: {
        marginTop: 16,
        paddingHorizontal: 24,
        width: '100%',
        height: 368,
        justifyContent: "space-evenly",
    },
    item: {
        height: 48,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E6EA"
    },
    itemText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});

export default ReportScreen;
