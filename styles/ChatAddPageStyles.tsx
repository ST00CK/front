import { StyleSheet } from 'react-native';

const ChatAddPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
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
        marginTop: 20,
    },
});

export default ChatAddPageStyles;