import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
        height: 58,
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E6EA"
    },
    itemText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    itemDate: {
        fontSize: 14,
        color: "#888",
        marginTop: 4,
    },
    itemNote: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
        marginRight: 24
    },


});