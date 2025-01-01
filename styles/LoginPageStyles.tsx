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
        top: '30%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '70%',
    },
    image: {
        position: 'absolute',
        top: '10%',
        marginBottom: 20,
    },
    input: {
        marginVertical: 10,
    },
    button: {
        margin: 10,
    },
});

export default styles;