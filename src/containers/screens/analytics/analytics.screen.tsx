import React, { useState, useCallback, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image
} from "react-native";
import { styles } from './analytics-screen.style'
import { Calendar, LocaleConfig } from "react-native-calendars";
import DatePicker from "react-native-date-picker";

// Cấu hình ngôn ngữ tiếng Việt cho Calendar
LocaleConfig.locales['vi'] = {
    monthNames: [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ],
    monthNamesShort: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
    dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'vi';

const { width } = Dimensions.get("window");
const Header = ({ selectedMonth,
    setSelectedMonth
}: { selectedMonth: string; setSelectedMonth: React.Dispatch<React.SetStateAction<string>> }) => {

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());

    const formatMonthYear = useCallback((date: Date) => {
        const monthNames = [
            "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
        ];
        return `${monthNames[date.getMonth()]}`;
    }, []);

    useEffect(() => {
        setSelectedMonth(formatMonthYear(date));
    }, [date]);

    return (
        <View style={styles.header}>
            <Text style={styles.yearText}>{date.getFullYear()}</Text>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.monthSelector}>
                <View style={styles.monthContainer}>
                    <Text style={styles.monthText}>{selectedMonth}</Text>
                    <Image source={require('../../../../assets/icons/down.png')} style={styles.logo} />
                </View>
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                locale="vi"
                buttonColor="red"
                title="Chọn ngày"
                cancelText="Hủy bỏ"
                confirmText="Xác nhận"
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);
                    setSelectedMonth(formatMonthYear(selectedDate));
                }}
                onCancel={() => setOpen(false)}
            />
        </View>
    );
};

export const AnalyticsScreen = (navigation: any) => {
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>("today")

    // list danh sách
    const [attendanceStats, setAttendanceStats] = useState([
        { color: "#4CAF50", text: "Đúng giờ", count: null }, // count để sau call từ api
        { color: "#FFC107", text: "Đi muộn, về sớm", count: null },
        { color: "#03A9F4", text: "Làm việc tại nhà", count: null },
        { color: "#9C27B0", text: "Nghỉ phép", count: null },
        { color: "#E91E63", text: "Không phép", count: null }
    ])

    // Fake data lịch
    const attendanceData = {
        "2025-02-08": { marked: true, dotColor: "#FFC107" },
        "2025-02-09": { marked: true, dotColor: "#03A9F4" },
        "2025-02-10": { marked: true, dotColor: "#9C27B0" },
        "2025-02-15": { marked: true, dotColor: "#E91E63" },
    };
    const today = new Date().toISOString().split("T")[0];
    const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({
        ...attendanceData, // Bắt đầu với dữ liệu điểm danh có sẵn
        [today]: { selected: true, selectedColor: "black" },
    });

    const handleDayPress = (day: any) => {
        setSelectedDate(day.dateString);
        setMarkedDates({
            ...attendanceData, // Giữ lại dữ liệu điểm danh cũ
            [day.dateString]: {
                selected: true,
                selectedColor: "black",
            },
        });

    };


    return (
        <View style={styles.container}>
            <Header selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            {/* Label trạng thái */}
            <View style={styles.statusContainer}>
                {attendanceStats.map((item, index) => (
                    <View key={index} style={styles.statusItem}>
                        <View style={[styles.dot, { backgroundColor: item.color }]} />
                        <Text style={styles.statusText}>{item.text}</Text>
                        <Text style={styles.statusCount}>{item.count !== null ? item.count : "--"}</Text>
                    </View>
                ))}
            </View>

            {/* Lịch */}
            <Calendar
                style={styles.calendar}
                markingType={"dot"}
                markedDates={markedDates}
                firstDay={1}
                theme={{
                    selectedDayBackgroundColor: "#000",
                    todayTextColor: "#000",
                    arrowColor: "#000",
                }}
                onDayPress={handleDayPress}
            />
        </View>
    );
}

