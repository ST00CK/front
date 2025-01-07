import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
    header: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'flex-start',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
});

export default styles;