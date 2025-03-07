import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10
    },
    card: {
        backgroundColor: "#F3F4F6",
        borderRadius: 10,
        height: 80,
        justifyContent: 'center',
        marginTop: 13

    },
    label: {
        fontSize: 16,
        fontWeight: "bold"
    },
    date: {
        fontSize: 14,
        color: "#888",
        marginHorizontal: 24,
        marginTop: 5
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 20,
        marginHorizontal: 24,
    },
    note: {
        fontSize: 16,
        color: "#333",
        marginTop: 5,
        marginHorizontal: 24,
    },
    itemText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginHorizontal: 24,

    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
        padding: 10,
    },

});