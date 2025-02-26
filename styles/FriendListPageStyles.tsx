import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    friendInputContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        borderRadius: 5,
    },
    friendInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        marginBottom: 0,
        borderWidth: 0,
    },
    addButton: {
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    addButtonText: {
        fontSize: 14,
    },
    input: {
        flex: 1,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    settingIcon: {
        marginLeft: 'auto',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    deleteButton: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default styles;