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
        position: 'absolute',
        top: '25%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '80%',
    },
    image: {
        position: 'absolute',
        top: '10%',
        marginBottom: 20,
    },
    input: {
        marginVertical: 10,
        width: '80%',
    },
    button: {
        flex: 1,
        margin: 10,
    },
});

export default styles;