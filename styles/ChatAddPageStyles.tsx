import { StyleSheet } from 'react-native';

const ChatAddPageStyles = StyleSheet.create({
    pageContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    profileContainer: {
        flex: 1,
        marginTop: 20,
    },
    footer: {
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    confirmButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ChatAddPageStyles;