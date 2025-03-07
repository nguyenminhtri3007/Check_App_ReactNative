import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginTop: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal: 16
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        marginHorizontal: 16,
        marginTop: 16
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 22,
    },
    textInputContainer: {
        flex: 1,
        marginLeft: 10,
        backgroundColor: '#E1E6EB',
        borderRadius: 61
    },
    input: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    headerContainer: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E1E6EB",
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        borderTopWidth: 1,
        borderTopColor: "#E1E6EB",
        paddingVertical: 10,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
    },
    optionText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    usersHeader: {
        height: 60,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E1E6EB",
    },
    usersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 24
    },
    createRoom: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#82b1ff',
        marginRight: 10,
        width: 140,
        height: 45,
    },
    userAvatar: {
        marginRight: 10,
    },
    separator: {
        height: 30,
        width: 2,
        backgroundColor: "#E1E6EB", // Màu gạch
    },
    stotyContainer: {
        width: '100%',
        height: 192,
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        width: 106,
        height: 170,
        position: 'relative',
        marginRight: 8,
        borderRadius: 12,
        overflow: 'hidden',
    },
    cardStory: {
        width: '100%',
        height: 170,
        borderRadius: 12,
    },
    cardUser: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        width: 39,
        height: 39,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardFooter: {
        width: '100%',
        position: 'absolute',
        bottom: 12,
        left: 9,
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    bottomDivider: {
        width: '100%',
        height: 9,
        backgroundColor: '#f0f2f5',
    },
    feedContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 8,
        borderBottomColor: '#f0f2f5',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    postTime: {
        fontSize: 12,
        color: 'gray',
    },
    postText: {
        fontSize: 14,
        marginBottom: 8,
    },
    postImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginTop: 9,
    },
    footer: {
        paddingHorizontal: 11,
    },
    footerCount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 9,
    },
    iconCount: {
        backgroundColor: '#1878f3',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
    textCount: {
        fontSize: 11,
        color: '#424040',
    },
    footerMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 9,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 12,
        color: '#424040',
        marginLeft: 6,
    },

});