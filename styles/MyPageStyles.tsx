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
  passwordChangeButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  passwordChangeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  passwordChangeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  passwordInput: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  passwordSubmitButton: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  passwordSubmitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;