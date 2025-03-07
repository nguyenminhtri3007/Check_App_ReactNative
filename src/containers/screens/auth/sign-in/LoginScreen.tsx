
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { AuthService } from "../../../../data/services/auth.service";
import { AuthModel } from "../../../../data/model/auth.model";
import { AppConfig } from "../../../../common/config/app.config";

const screenWidth = Dimensions.get("window").width;

const LoginScreen = ({ navigation }: any) => {
  const authServices = new AuthService();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const isValidEmail = (text: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError("");
  };

  const handleLoginPress = async () => {
    let errorMessage = "";

    if (!email.trim()) {
      errorMessage = "Vui lòng nhập email!";
    } else if (!isValidEmail(email)) {
      errorMessage = "Vui lòng nhập đúng định dạng email!";
    }

    if (errorMessage) {
      setEmailError(errorMessage);
      return;
    }

    try {

      console.log("đã gửi email:", email)
      const authModel = new AuthModel(email);

      console.log("Dữ liệu gửi lên server:", authModel);

      const response = await authServices.signIn(authModel);

      console.log("Đã phản hồi:", response);

      if (response) {
        const { token, otp } = response;
        // Chuyển sang màn hình nhập OTP và truyền OTP thật
        navigation.navigate('sign-in-otp', { email, otp, token });
      } else {
        Alert.alert("Lỗi", "Không nhận được mã OTP từ server.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.");
    }


  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content"></StatusBar>
      <View style={styles.logoContainer}>
        <Image source={require('../../../../../assets/images/iconLogo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.text}>Đăng Nhập</Text>
        <Text style={styles.title}> Ứng dụng VNCheck giúp doanh nghiệp và cửa hàng quản lý nhân viên hiệu quả hơn</Text>
      </View>

      <View style={styles.lable}>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: emailError ? "red" : "black" },
            ]}
            placeholder="Nhập email của bạn"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.textHelp}>{emailError}</Text> : null}
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {
          handleLoginPress();
        }}>
          <Text style={styles.buttonText}>Đăng nhập</Text>

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoContainer: {
    marginTop: 84,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  header:
    { alignItems: "center", marginTop: 36 },
  text:
    { fontSize: 30, fontWeight: "bold" },
  lable:
    { marginHorizontal: 24, marginTop: 24, width: screenWidth - 48 },
  title: {
    marginTop: 1,
    textAlign: "center",
    paddingHorizontal: 24,
    fontSize: 16,
    color: "#808B99"
  },

  inputContainer:
    { width: "100%" },
  labelText: {
    fontSize: 14, fontWeight: "bold", color: "black", marginBottom: 4
  },
  input:
    { width: "100%", height: 40, borderWidth: 1, borderRadius: 8, paddingHorizontal: 10 },
  textHelp:
    { color: "red", fontSize: 12, marginTop: 4 },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    borderRadius: 8,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default LoginScreen;

