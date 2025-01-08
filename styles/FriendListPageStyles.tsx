import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        marginBottom: 20,
    },
    inputContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 70,
    },
    input: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchContainer: {
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
    },
    smallProfilesContainer: {
        marginTop: 120,
        width: '100%',
    },
    smallProfile: {
        marginBottom: 10,
    },
});

export default styles;