
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  PanResponder,
  Animated,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AppConfig } from "../../../common/config/app.config";
import { AttendanceService } from "../../../data/services/attendance.service";


const { width } = Dimensions.get("window");
const SLIDE_WIDTH = width - 48;
const BUTTON_WIDTH = 140;
const MAX_TRANSLATE = SLIDE_WIDTH - BUTTON_WIDTH - 8;
const CheckInScreen = ({ navigation }: any) => {
  const [bgColor, setBgColor] = useState("#062E26");
  const [time, setTime] = useState<Date>(new Date());
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);
  const [totalTime, setTotalTime] = useState<string>("-- giờ -- phút");
  const translateX = useRef(new Animated.Value(0)).current;
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalType, setModalType] = useState<"checkin" | "checkout">("checkin");

  useEffect(() => {
    if (checkInTime && checkOutTime) {
      setTotalTime(calculateTotalTime(checkInTime, checkOutTime));
    }
  }, [checkOutTime, checkInTime]);


  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    checkToken();
    return () => clearInterval(timer);
  }, []);

  const checkToken = async () => {
    try {
      const appConfig = new AppConfig();
      const token = await appConfig.getAccessToken();
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  }

  const animateSlider = (toValue: number, callback?: () => void) => {
    Animated.timing(translateX, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (callback) callback();
    });
  };

  const handleSwipe = async (gestureDx: number) => {
    if (gestureDx > MAX_TRANSLATE * 0.7) {
      try {
        const now = new Date();
        if (!checkedIn) {
          // Gọi API check-in
          const response = await attendanceServices.checkIn();
          console.log(response);

          setCheckInTime(response?.data?.checkintime);
          setBgColor("#3A0D0D");
          setModalType("checkin");
          setCheckedIn(prevCheckedIn => !prevCheckedIn);
          console.log("Check-in time:", response?.data?.checkintime?.toLocaleTimeString("vi-VN"));
        } else {
          // Gọi API check-out
          console.log('abc')

          const response = await attendanceServices.checkOut();

          console.log(response);

          setCheckOutTime(now);
          setBgColor("#062E26");
          setModalType("checkout");

          if (checkInTime) {
            const totalTime = calculateTotalTime(checkInTime, now);
            setTotalTime(totalTime);
            console.log("workTime:", totalTime);
          }

          console.log("Check-out time:", now.toLocaleTimeString("vi-VN"));
          setCheckedIn(prevCheckedIn => !prevCheckedIn);
        }
        setShowSuccessModal(true);
        setModalDisplayed(true);

        animateSlider(MAX_TRANSLATE, () => animateSlider(0));
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      animateSlider(0);
    }
  };
  const handleResendAna = () => {
    navigation.navigate("MainTabs", { screen: "Thống Kê" });
  };

  const calculateTotalTime = (checkIn: Date | null, checkOut: Date | null): string => {
    if (!checkIn || !checkOut) return "-- giờ -- phút"; // Nếu chưa có thời gian, trả về giá trị mặc định

    const diffMs = checkOut.getTime() - checkIn.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours} giờ ${minutes} phút`;
  };


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx >= 0 && gesture.dx <= MAX_TRANSLATE) {
          translateX.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => handleSwipe(gesture.dx),
    })
  ).current;

  const handleCheckOut = async () => {
    try {
      const response = await attendanceServices.checkOut();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const attendanceServices = new AttendanceService();
  const handleCheckIn = async () => {
    try {
      const response = await attendanceServices.checkIn();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={bgColor} />
      <Header />
      <Clock time={time} />
      {checkedIn === false && checkInTime === null ? (
        // Nếu chưa check-in, hiển thị nút check-in
        <CheckInOutButton
          checkedIn={checkedIn}
          panResponder={panResponder}
          translateX={translateX}
          onPress={() => handleCheckIn()}
        />
      ) : checkedIn === true ? (
        // Nếu đã check-in, hiển thị nút check-out
        <CheckInOutButton
          checkedIn={checkedIn}
          panResponder={panResponder}
          translateX={translateX}
          onPress={() => handleCheckOut()}
        />
      ) : (
        // Nếu đã check-out, hiển thị thông báo kết thúc ngày làm việc
        <View style={styles.endWorkContainer}>
          <Text style={styles.endWorkText}>
            Ngày làm việc hôm nay đã kết thúc, hẹn gặp lại bạn vào ngày mai nhé!
          </Text>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={handleResendAna}
          >
            <Text style={styles.historyText}>Xem lịch sử chấm công</Text>
            <Image
              source={require("../../../../assets/icons/iconBack.png")}
              style={styles.iconBack}
            />
          </TouchableOpacity>
        </View>
      )}
      <InfoSection checkedIn={checkedIn}
        time={time}
        checkInTime={checkInTime ? formatTime(checkInTime) : ""}
        checkOutTime={checkOutTime ? formatTime(checkOutTime) : ""}
        totalTime={totalTime} />
      <CheckInSuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setModalDisplayed(false);
        }}
        modalType={modalType}
      />
    </View>
  );
};

const CheckInSuccessModal = ({ visible, onClose, modalType }: { visible: boolean; onClose: () => void; modalType: "checkin" | "checkout"; }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Icon check thành công */}
          <View style={styles.iconContainer}>
            <Image source={require("../../../../assets/icons/success.png")} style={styles.successIcon} />
          </View>

          {/* Tiêu đề khác nhau */}
          <Text style={styles.successTitle}>
            <Text style={modalType === "checkin" ? styles.greenText : styles.redText}>
              {modalType === "checkin" ? "Check in" : "Check out"}
            </Text>{" "}
            <Text style={styles.boldText}>thành công</Text>
          </Text>

          {/* Nội dung khác nhau */}
          <Text style={styles.messageText} >
            {modalType === "checkin"
              ? "Chúc bạn một ngày làm việc vui vẻ!"
              : "Hẹn gặp lại bạn vào ngày mai nhé!"}
          </Text>

          {/* Nút đóng */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đã hiểu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Header = () => (
  <View style={styles.header}>
    <View>
      <Text style={styles.headerText}>Finatech JSC</Text>
      <Text style={styles.workingHours}>8:30 - 18:00</Text>
    </View>
    <View style={styles.icons}>
      <Image source={require("../../../../assets/icons/light.png")} style={styles.logo} />
      <Image source={require("../../../../assets/icons/filled.png")} style={styles.iconRight} />
    </View>
  </View>
);

const convertDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getUTCFullYear();
  let finalDay = day + "";
  let finalMonth = `${month + 1}`;
  if (day < 10) {
    finalDay = "0" + day;
  }
  if (month < 10) {
    finalMonth = "0" + `${month + 1}`;
  }
  return `${finalDay}/${finalMonth}/${year}`;
}

const Clock = ({ time }: { time: Date }) => (
  <View style={styles.clockContainer}>
    <Text style={styles.dateText}>
      Thứ {time.getDay() + 1}, {convertDate(time)}
    </Text>
    <Text style={styles.timeText}>
      {`${time.getHours()}:${time.getMinutes().toString().padStart(2, "0")}`}
    </Text>
  </View>
);

const CheckInOutButton = ({
  checkedIn,
  panResponder,
  translateX,
  onPress,
}: {
  checkedIn: boolean;
  panResponder: any;
  translateX: Animated.Value;
  onPress: () => void;
}) => (
  <View style={styles.track}>
    <Animated.View
      style={[
        styles.checkInButton,
        { transform: [{ translateX }], backgroundColor: checkedIn ? "#FF6871" : "#00D293" },
      ]}
      {...panResponder.panHandlers}

    >
      <Text style={styles.checkInText}>
        {checkedIn ? "Check out" : "Check in"}
      </Text>
      <Image source={require("../../../../assets/icons/check.png")} style={styles.checkIcon} />
    </Animated.View>

    <Text style={styles.label}>
      {checkedIn ? "Trượt để check out" : "Trượt để check in"}
    </Text>
  </View>
);

const InfoSection = ({
  checkedIn,
  time,
  checkInTime,
  checkOutTime,
  totalTime,
}: {
  checkedIn: boolean;
  time: Date;
  checkInTime: string | "";
  checkOutTime: string | "";
  totalTime: string;
}) => (
  <View style={styles.infoContainer}>
    {[
      { title: "Check in", data: checkInTime || "  --:--" },
      { title: "Check out", data: checkOutTime || "   --:--" },
      { title: "Thời gian làm việc", data: totalTime },
    ].map((item, index) => (
      <View key={index} style={styles.infoBox}>
        <Text style={styles.infoTitle}>{item.title}</Text>
        <Text style={styles.infoData}>{item.data}</Text>
        {index < 2 && <View style={styles.divider} />}
      </View>
    ))}
  </View>
);

const formatTime = (date: unknown): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.warn("Invalid date received:", date);
    return "--:--"; // Giá trị mặc định khi date không hợp lệ
  }

  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export default CheckInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    height: 40,
    marginTop: 16
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  workingHours: {
    fontSize: 14,
    color: "#A0A0A0",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 24,
    height: 24,
  },
  iconRight: {
    marginLeft: 25,
    width: 24,
    height: 24,
  },
  clockContainer: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 16,
    borderColor: "#3D5A53",
    borderRadius: width * 0.35,
    width: width * 0.7,
    height: width * 0.7,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  dateText: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "400",
  },
  timeText: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
  },
  track: {
    width: SLIDE_WIDTH,
    height: 68,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    borderRadius: 34,
    alignSelf: "center",
    position: "relative",
  },
  checkInButton: {
    position: "absolute",
    left: 4,
    width: BUTTON_WIDTH,
    height: 56,
    backgroundColor: "#00D293",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  checkInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  arrowIcon: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 24,
    height: 24,
  },
  checkIcon: {
    width: 24,
    height: 24,
    marginLeft: 4,
  },
  label: {
    position: "absolute",
    right: 20,
    color: "#A0A0A0",
    fontSize: 14,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    paddingVertical: 40,
    elevation: 4,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 130,

  },
  infoBox: {
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7A7A7A",
    marginBottom: 5,
  },
  infoData: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#272E36",
  },
  divider: {
    width: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 5,
  },
  endWorkContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 53,
  },
  endWorkText: {
    color: "#68D2FF",
    fontSize: 16,
    textAlign: "center",
  },

  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginTop: 20,
    height: 36,
    width: 212
  },

  historyText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 14

  },
  iconBack: {
    width: 16,
    height: 16,
    tintColor: "#000",
    marginRight: 10
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  iconContainer: {
    backgroundColor: "#00D293",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successIcon: {
    width: 32,
    height: 32,
    tintColor: "#FFF",
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  greenText: {
    color: "#00D293",
    fontWeight: "bold",
  },
  redText: {
    color: "#E05B63",
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
  },
  messageText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 24,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },

});
