
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
} from "react-native";

const { width } = Dimensions.get("window");
const SLIDE_WIDTH = width - 48;
const BUTTON_WIDTH = 140;
const MAX_TRANSLATE = SLIDE_WIDTH - BUTTON_WIDTH - 8;
const CheckInScreen = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [checkedIn, setCheckedIn] = useState<boolean>(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);
  const [totalTime, setTotalTime] = useState<string>("-- giờ -- phút");
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (!checkedIn && gesture.dx >= 0 && gesture.dx <= MAX_TRANSLATE) {
          translateX.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > MAX_TRANSLATE * 0.7 && !checkedIn) {
          setCheckedIn(true);
          setCheckInTime(new Date());
          Animated.timing(translateX, {
            toValue: MAX_TRANSLATE,
            duration: 200,
            useNativeDriver: false,
          }).start();
        } else if (checkedIn) {
          if (gesture.dx > MAX_TRANSLATE * 0.7) {
            setCheckOutTime(new Date());
            setCheckedIn(false);
            Animated.timing(translateX, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
          } else {

            Animated.timing(translateX, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
          }
        }
      },
    })
  ).current;
  const handleCheckOut = () => {
    setCheckedIn(false);
    setCheckInTime(null);
    setCheckOutTime(null);
    translateX.setValue(0);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#062E26" />
      <Header />
      <Clock time={time} />
      {checkedIn ? (
        <CheckOutButton onPress={handleCheckOut} />
      ) : (
        <CheckInButton
          checkedIn={checkedIn}
          panResponder={panResponder}
          translateX={translateX}
        />
      )}
      <InfoSection checkedIn={checkedIn}
        time={time}
        checkInTime={checkInTime ? formatTime(checkInTime) : null}
        checkOutTime={checkOutTime ? formatTime(checkOutTime) : null} />
    </View>
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

const Clock = ({ time }: { time: Date }) => (
  <View style={styles.clockContainer}>
    <Text style={styles.dateText}>
      Thứ {time.getDay() + 1}, {time.getDate()}/{time.getMonth() + 1}/{time.getFullYear()}
    </Text>
    <Text style={styles.timeText}>
      {`${time.getHours()}:${time.getMinutes().toString().padStart(2, "0")}`}
    </Text>
  </View>
);

const CheckInButton = ({
  checkedIn,
  panResponder,
  translateX,
}: {
  checkedIn: boolean;
  panResponder: any;
  translateX: Animated.Value;
}) => (
  <View style={styles.track}>
    <Animated.View
      style={[
        styles.checkInButton,
        { transform: [{ translateX }], backgroundColor: checkedIn ? "#FF6871" : "#00D293" },
      ]}
      {...(!checkedIn ? panResponder.panHandlers : {})}
    >
      <Text style={styles.checkInText}>
        {checkedIn ? "Check out" : "Check in"}
      </Text>
      <Image source={require("../../../../assets/icons/check.png")} style={styles.checkIcon} />
    </Animated.View>
    {!checkedIn && <Text style={styles.label}>Trượt để check in</Text>}
  </View>
);
const CheckOutButton = ({ onPress }: { onPress: () => void }) => (
  <View style={styles.track}>
    <Animated.View
      style={[styles.checkInButton, { backgroundColor: "#FF6871" }]}
    >
      <Text style={styles.checkInText} onPress={onPress}>
        Check out
      </Text>
      <Image
        source={require("../../../../assets/icons/check.png")}
        style={styles.checkIcon}
      />
    </Animated.View>
    <Text style={styles.label}>Trượt để check out</Text>
  </View>
);

const InfoSection = ({
  checkedIn,
  time,
  checkInTime,
  checkOutTime,
}: {
  checkedIn: boolean;
  time: Date;
  checkInTime: string | null;
  checkOutTime: string | null;
}) => (
  <View style={styles.infoContainer}>
    {[
      { title: "Check in", data: checkInTime || "  --:--" },
      { title: "Check out", data: checkOutTime || "   --:--" },
      { title: "Thời gian làm việc", data: "-- giờ -- phút" },
    ].map((item, index) => (
      <View key={index} style={styles.infoBox}>
        <Text style={styles.infoTitle}>{item.title}</Text>
        <Text style={styles.infoData}>{item.data}</Text>
        {index < 2 && <View style={styles.divider} />}
      </View>
    ))}
  </View>
);

const formatTime = (date: Date): string =>
  `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

export default CheckInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062E26",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#042F2E",
    paddingHorizontal: 24,
    height: 40,
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
});
