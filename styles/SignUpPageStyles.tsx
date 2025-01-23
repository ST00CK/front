import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
        marginBottom: 20,
    },
    inputContainer: {
        marginTop: '40%',
        width: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '70%',
        paddingHorizontal: 20,
    },
    image: {
        position: 'absolute',
        top: '10%',
        marginBottom: 20,
    },
    input: {
        marginVertical: 15,
        width: '70%',
    },
    button: {
        margin: 10,
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
});

export default styles;
