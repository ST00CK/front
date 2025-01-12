import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 10,
    },
    largeProfile: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    smallProfilesContainer: {
        marginTop: 100,
        width: '100%',
    },
    smallProfile: {
        marginBottom: 10,
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
});

export default styles;