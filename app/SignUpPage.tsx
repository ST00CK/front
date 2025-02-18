import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, ScrollView, Animated } from 'react-native';
import { useNavigation } from 'expo-router';
import Input from '../components/stoock/Common/Input';
import ShortButton from '../components/stoock/Common/ShortButton';
import StoockImage from '../assets/images/STOOCK!.png';
import styles from '../styles/SignUpPageStyles';
import { NavigationProp } from '@react-navigation/native';
import { useSignUpMutation, useEmailSendMutation, useEmailCheckMutation } from '../query/userQuery';

type RootStackParamList = {
    FriendListPage: undefined;
    LoginPage: undefined;
};

const SignUpPage = () => {
    const [ID, setID] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [inputEmailCode, setInputEmailCode] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isSignUpDisabled, setIsSignUpDisabled] = useState(true);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEmailCodeVisible, setIsEmailCodeVisible] = useState(false);
    const [emailCodeSlideAnim] = useState(new Animated.Value(0));
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const signUpMutation = useSignUpMutation();
    const emailSendMutation = useEmailSendMutation();
    const emailCheckMutation = useEmailCheckMutation();

    useEffect(() => {
        if (ID && name && email && password && confirmPassword && isEmailVerified) {
            setIsSignUpDisabled(false);
        } else {
            setIsSignUpDisabled(true);
        }
    }, [ID, name, email, password, confirmPassword, isEmailVerified]);

    const navigateToLoginPage = () => {
        navigation.navigate('LoginPage');
    };

    const handleSignUp = async () => {
        if (!ID || !name || !email || !password || !confirmPassword) {
            setErrorMessage('모든 필드를 입력해주세요.');
            setIsErrorModalVisible(true);
            return;
        }

        if (!isEmailVerified) {
            setErrorMessage('이메일을 인증해주세요.');
            setIsErrorModalVisible(true);
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(password)) {
            setPasswordError('비밀번호에 특수문자가 포함되어야 합니다.');
            return;
        } else {
            setPasswordError('');
        }

        try {
            await signUpMutation.mutateAsync({
                userId: ID,
                name: name,
                email: email,
                password: password,
            });
            setIsModalVisible(true);
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleModalSignUp = () => {
        setIsModalVisible(false);
        navigateToLoginPage();
    };

    const handleSendEmailCode = async () => {
        if (!email) {
            setErrorMessage('이메일을 입력해주세요.');
            setIsErrorModalVisible(true);
            return;
        }

        try {
            const response = await emailSendMutation.mutateAsync(email);
            if (response) {
                alert("인증코드가 발송되었습니다.");
                setIsEmailCodeVisible(true);
                Animated.timing(emailCodeSlideAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        } catch (error) {
            console.error("인증코드가 올바르지 않습니다:", error);
            alert("인증코드가 올바르지 않습니다. 다시 시도해주세요.");
        }
    };

    const handleCheckEmailCode = async () => {
        if (!inputEmailCode) {
            setErrorMessage('인증코드를 입력해주세요.');
            setIsErrorModalVisible(true);
            return;
        }
        try {
            const response = await emailCheckMutation.mutateAsync({ email, authCode: inputEmailCode });
            console.log("emailCheckMutation 호출 후");
            console.log("서버 응답:", response);
            if (response === "인증이 성공적으로 완료되었습니다.") {
                setIsEmailVerified(true);
                alert("이메일 인증이 완료되었습니다.");
            } else {
                alert("인증코드가 올바르지 않습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("인증코드가 올바르지 않습니다:", error);
            alert("인증코드가 올바르지 않습니다. 다시 시도해주세요.");
        }
    };

    const handlePasswordBlur = () => {
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(password)) {
            setPasswordError('비밀번호에 특수문자가 포함되어야 합니다.');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordBlur = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleErrorModalClose = () => {
        setIsErrorModalVisible(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image source={StoockImage} style={styles.image} />
                <Text style={styles.text}>회원가입</Text>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="이메일"
                        onChangeText={setEmail}
                        value={email}
                        style={styles.input}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <ShortButton
                        text="인증코드"
                        onClick={handleSendEmailCode}
                        style={[styles.button, !email && styles.disabledButton]}
                        disabled={!email}
                    />
                </View>
                {isEmailCodeVisible && (
                    <Animated.View style={{ width: '80%', transform: [{ scaleY: emailCodeSlideAnim }] }}>
                        <View style={styles.emailCodeInputContainer}>
                            <Input
                                placeholder="인증코드"
                                onChangeText={setInputEmailCode}
                                value={inputEmailCode}
                                style={styles.emailCodeInput}
                            />
                        </View>
                        <View style={styles.emailCodeButtonContainer}>
                            <ShortButton
                                text="확인"
                                onClick={handleCheckEmailCode}
                                style={[styles.emailCodeButton, !inputEmailCode && styles.disabledButton]}
                                disabled={!inputEmailCode}
                            />
                        </View>
                    </Animated.View>
                )}
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="아이디"
                        onChangeText={setID}
                        value={ID}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="이름"
                        onChangeText={setName}
                        value={name}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="비밀번호 ( 특수문자 필수 포함 )"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                        style={styles.input}
                        onBlur={handlePasswordBlur}
                    />
                    {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="비밀번호 확인"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        secureTextEntry
                        style={styles.input}
                        onBlur={handleConfirmPasswordBlur}
                    />
                    {confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
                </View>
                <View style={styles.buttonContainer}>
                    <ShortButton
                        text="회원가입"
                        onClick={handleSignUp}
                        style={[styles.button, isSignUpDisabled && styles.disabledButton]}
                        disabled={isSignUpDisabled}
                    />
                </View>

                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>회원가입이 완료되었습니다.</Text>
                            <ShortButton text="확인" onClick={handleModalSignUp} style={styles.button} />
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={isErrorModalVisible}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>{errorMessage}</Text>
                            <ShortButton text="확인" onClick={handleErrorModalClose} style={styles.button} />
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

export default SignUpPage;