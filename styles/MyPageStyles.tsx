import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
  editText: {
    color: 'blue',
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonActive: {
    backgroundColor: 'blue',
  },
  submitButtonInactive: {
    backgroundColor: 'gray',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default styles;