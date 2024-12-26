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
});

export default styles;