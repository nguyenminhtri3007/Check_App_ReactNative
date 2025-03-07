import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        marginHorizontal: 24,
        marginTop: 16
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    inputWrapper: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        justifyContent: "center",
        height: 50
    },
    inputText: {
        fontSize: 16,
        color: "#333",
    },
    iconContainer: {
        right: 10,
        top: 10,
    },
    dropdownIcon: {
        fontSize: 16,
        color: "#999",
    },
    date: {

    },
    dateText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginLeft: 20,
    },
    inputDatePicker: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CFD6DD",
        borderRadius: 8,
        marginHorizontal: 24,
        height: 50,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "black",
        marginLeft: 12
    },
    iconDate: {
        padding: 5,
    },
    note: {

    },
    noteText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginLeft: 20,
    },
    inputNote: {
        borderWidth: 1,
        borderColor: "#CFD6DD",
        borderRadius: 8,
        marginHorizontal: 24,
        height: 233,
    },
    inputNoteHome: {
        fontSize: 16,
        color: "black",
        marginLeft: 12
    },
    submitContainer: {
        marginTop: 200,
        alignItems: "center",
        marginHorizontal: 24,
    },
    submitButton: {
        backgroundColor: "black",
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        width: "100%",

    },
    submitText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    errorText: {
        color: "red",
        fontSize: 14, marginTop: 5,
        marginLeft: 20
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContainer: {
        backgroundColor: "#FFFFFF",
        width: "80%",
        borderRadius: 12,
        alignItems: "center",
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    successIcon: {
        width: 32,
        height: 32,
        tintColor: "#FFF",
    },
    successTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 8,
    },
    closeButton: {
        backgroundColor: "#000",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 24,
    },
    closeButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FFF",
    },

});
