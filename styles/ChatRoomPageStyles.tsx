import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    settingIcon: {
        padding: 10,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    chatRoomName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    messagesContainer: {
        flex: 1,
    },
    panel: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '70%',
        backgroundColor: '#fff',
        borderLeftWidth: 1,
        borderLeftColor: '#ccc',
        padding: 10,
    },
    panelTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    panelFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    settingsButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    settingsButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default styles;