
import React, { useState, useRef, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    View,
    TextInput,
    Alert

} from "react-native";
import { AppConfig } from "../../../../common/config/app.config";

const LoginOTPScreen = ({ navigation, route }: any) => {
    const email = route.params?.email || "email của bạn";
    const OTP = String(route.params?.otp ?? "");
    const token = route.params?.token ?? "";
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
    const inputRefs = useRef<Array<TextInput | null>>(new Array(4).fill(null));
    const [timer, setTimer] = useState(180);
    const [resendAvailable, setResendAvailable] = useState(false)

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setResendAvailable(true);
        }
    }, [timer]);

    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (event: any, index: number) => {
        if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
        }
    };

    const handleResendOTP = () => {
        setOtp(new Array(4).fill(''));
        setTimer(180);
        setResendAvailable(false);
    };

    const onHandleVerifyOTP = async () => {
        const enteredOTP = otp.join("").trim(); // Chuyển mảng thành chuỗi và loại bỏ khoảng trắng

        console.log("OTP nhập vào:", enteredOTP);
        console.log("OTP từ server:", OTP);

        if (enteredOTP === OTP) {
            // Nếu OTP đúng, chuyển sang màn hình chính
            const appConfig = new AppConfig();
            await appConfig.setAccessToken(token);
            navigation.navigate("MainTabs");
        } else {
            Alert.alert(
                "Lỗi xác thực OTP", // Tiêu đề
                "Mã OTP không chính xác! Vui lòng thử lại.", // Nội dung thông báo
                [{ text: "OK", style: "destructive" }] // Nút OK
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'#FF3B30'} barStyle="light-content" />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('../../../../../assets/icons/arrowback.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
                <Image source={require('../../../../../assets/images/LogoOTP.png')}
                    style={styles.logo}
                />
            </View>

            <View style={styles.header}>
                <Text style={styles.text}>Nhập mã OTP</Text>
                <Text style={styles.title}>
                    Mã OTP đã được gửi đến email <Text style={styles.email}>{email}</Text>
                </Text>
            </View>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={[
                            styles.otpBox,
                            focusedIndex === index && styles.otpBoxFocused,
                        ]}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={digit}
                        onChangeText={(value) => handleChange(value, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(null)}
                        autoFocus={index === 0}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.verifyButton} onPress={() => onHandleVerifyOTP()}>
                <Text style={styles.verifyButtonText}>Xác nhận</Text>
            </TouchableOpacity>

            <View style={styles.resendContainer}>
                {resendAvailable ? (
                    <TouchableOpacity onPress={handleResendOTP}>
                        <Text style={styles.resendTextActive}>  Không nhận được mã?  Gửi lại mã</Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={styles.resendText}>
                        Không nhận được mã? Gửi lại sau {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        marginTop: 65,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 104.24,
        height: 119,
        resizeMode: 'contain',
    },
    header: {
        alignItems: "center",
        justifyContent: 'space-between'
    },
    text: {
        width: 700,
        paddingHorizontal: 51,
        height: 40,
        marginTop: 36,
        fontSize: 34,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#272E36'
    },
    title: {
        textAlign: "center",
        paddingHorizontal: 51,
        marginTop: 12,
        width: 400,
        fontSize: 14,
    },
    email: {
        fontWeight: "600",
        color: '#272E36',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 32,
        marginTop: 24,

    },
    otpBox: {
        width: 55,
        height: 74,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 30
    },
    verifyButton: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        width: '100%',
        marginBottom: 24,
    },
    verifyButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    resendText: {
        fontSize: 14,
        color: '#272E36',
    },
    resendTextActive: {
        fontSize: 14,
        color: '#FF3B30',
        fontWeight: 'bold',
    },
    otpBoxFocused: {
        borderColor: '#272E36',
        borderWidth: 2,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
        padding: 10,
    },

});

export default LoginOTPScreen;