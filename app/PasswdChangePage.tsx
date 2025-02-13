import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, ScrollView, Animated } from 'react-native';
import { useNavigation } from 'expo-router';
import Input from '../components/stoock/Common/Input';
import ShortButton from '../components/stoock/Common/ShortButton';
import StoockImage from '../assets/images/STOOCK!.png';
import styles from '../styles/PasswdChangePageStyles';
import { NavigationProp } from '@react-navigation/native';
import { useEmailSendMutation, useEmailCheckMutation, useChangePassWordMutation } from '../query/userQuery';

type RootStackParamList = {
    LoginPage: undefined;
};

const PasswdChangePage = () => {
    const [email, setEmail] = useState('');
    const [inputEmailCode, setInputEmailCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEmailCodeVisible, setIsEmailCodeVisible] = useState(false);
    const [emailCodeSlideAnim] = useState(new Animated.Value(0));
    const [passwordSlideAnim] = useState(new Animated.Value(0));
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const emailSendMutation = useEmailSendMutation();
    const emailCheckMutation = useEmailCheckMutation();
    const changePasswordMutation = useChangePassWordMutation();

    const navigateToLoginPage = () => {
        navigation.navigate('LoginPage');
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
            console.error("인증코드 발송 실패:", error);
            alert("인증코드 발송에 실패했습니다. 다시 시도해주세요.");
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
            if (response === "인증이 성공적으로 완료되었습니다.") {
                setIsEmailVerified(true);
                alert("이메일 인증이 완료되었습니다.");
                Animated.timing(passwordSlideAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            } else {
                alert("인증코드가 올바르지 않습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("인증코드 확인 실패:", error);
            alert("인증코드 확인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleChangePassword = async () => {
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (!specialCharRegex.test(password)) {
            setPasswordError('비밀번호에 특수문자가 포함되어야 합니다.');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await changePasswordMutation.mutateAsync({
                userId: email,
                oldPassword: '',
                newPassword: password,
            });
            setIsModalVisible(true);
        } catch (error) {
            console.error("비밀번호 변경 실패:", error);
            alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
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

    const handleModalClose = () => {
        setIsModalVisible(false);
        navigateToLoginPage();
    };

    const handleErrorModalClose = () => {
        setIsErrorModalVisible(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image source={StoockImage} style={styles.image} />
                <Text style={styles.text}>비밀번호 변경</Text>
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
                {isEmailVerified && (
                    <Animated.View style={{ width: '100%',justifyContent: 'center', alignItems: 'center', transform: [{ scaleY: passwordSlideAnim }] }}>
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder="새 비밀번호"
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
                                text="비밀번호 변경"
                                onClick={handleChangePassword}
                                style={[styles.button, (!password || !confirmPassword) && styles.disabledButton]}
                                disabled={!password || !confirmPassword}
                            />
                        </View>
                    </Animated.View>
                )}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>비밀번호가 성공적으로 변경되었습니다.</Text>
                            <ShortButton text="확인" onClick={handleModalClose} style={styles.button} />
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

export default PasswdChangePage;