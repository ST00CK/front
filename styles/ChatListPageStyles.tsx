import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: 10,
    },
    logoContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    chatRoomContainer: {
        marginTop: 70,
    },
});

export default styles;