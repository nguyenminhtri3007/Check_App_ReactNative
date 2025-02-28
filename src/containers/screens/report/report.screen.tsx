import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { styles } from "./report-screen.style"
import { FlatList } from "react-native";


const Header = ({ navigation }: { navigation: any }) => {
    const handlePress = () => {
        navigation.navigate("create-report")
    };

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Đơn Báo</Text>
            <TouchableOpacity style={styles.icon} onPress={() => handlePress()}>
                <Text style={styles.createText}>Tạo đơn báo</Text>
                <Image source={require("../../../../assets/icons/create.png")} style={styles.logo} />
            </TouchableOpacity>
        </View>
    );
};

const ListData = () => {
    const items = [
        { id: "1", text: "Đi làm muộn" },
        { id: "2", text: "Nghỉ phép 1 ngày" },
        { id: "3", text: "Nghỉ phép 1/2 ngày (sáng)" },
        { id: "4", text: "Nghỉ phép 1/2 ngày (chiều)" },
        { id: "5", text: "Làm việc ở nhà" },
    ];

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.itemText}>{item.text}</Text>
                </View>
            )}
            contentContainerStyle={styles.listData}
        />
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
export default ReportScreen;