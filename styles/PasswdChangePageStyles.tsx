import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        marginBottom: 5,
        width: '80%',
        alignItems: 'center',
    },
    emailCodeInputContainer: {
        marginBottom: 5,
        width: '100%',
        alignItems: 'center',
    },
    emailCodeButtonContainer: {
        marginBottom: 5,
        width: '100%',
        alignItems: 'center',
    },
    image: {
        marginBottom: 40,
    },
    input: {
        marginVertical: 10,
        width: '100%',
    },
    emailCodeInput: {
        marginVertical: 10,
        width: '100%',
    },
    button: {
        margin: 10,
        width: '100%',
    },
    emailCodeButton: {
        margin: 10,
        width: '100%',
    },
    disabledButton: {
        backgroundColor: '#d3d3d3',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default styles;