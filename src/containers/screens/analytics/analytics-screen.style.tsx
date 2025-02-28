import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
    yearText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        marginLeft: 24,
        marginTop: 10
    },
    logo: {
        height: 24,
        width: 24
    },
    monthContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 24
    },
    monthSelector: {
        flexDirection: "row",
        alignItems: "center",
    },
    monthText: {
        fontSize: 20,
        marginRight: 5,
        fontWeight: 'bold',
        color: '#272E36'
    },
    calendarContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
        elevation: 3,
    },
    calendarTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    statusContainer: {
        backgroundColor: "#F5F7FA",
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        marginHorizontal: 24,

    },
    statusItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    statusText: {
        fontSize: 16,
        flex: 1,
    },
    statusCount: {
        fontSize: 16,
        fontWeight: "bold",
    },
    calendar: {
        backgroundColor: "white",
        borderRadius: 12,
        marginHorizontal: 24,
    },
});