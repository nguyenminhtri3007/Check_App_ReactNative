
import React, { useState, useCallback, useEffect, useRef } from "react";
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

interface HeaderProps {
    date: Date;
    onDateChange: (newDate: Date) => void;
}

const Header: React.FC<HeaderProps> = ({ date, onDateChange }) => {
    const [open, setOpen] = useState(false);

    const formatMonthYear = (date: Date): string => {
        const monthNames = [
            "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
        ];
        return monthNames[date.getMonth()];
    };

    return (
        <View style={styles.header}>
            <Text style={styles.yearText}>{date.getFullYear()}</Text>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.monthSelector}>
                <View style={styles.monthContainer}>
                    <Text style={styles.monthText}>{formatMonthYear(date)}</Text>
                    <Image source={require('../../../../assets/icons/down.png')} style={styles.logo} />
                </View>
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                locale="vi"
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    onDateChange(selectedDate);
                }}
                onCancel={() => setOpen(false)}
            />
        </View>
    );
};

// Define interface for attendance data
interface AttendanceItem {
    marked: boolean;
    dotColor: string;
}

interface MarkedDate {
    selected?: boolean;
    selectedColor?: string;
    marked?: boolean;
    dotColor?: string;
}

export const AnalyticsScreen = (navigation: any) => {
    const [date, setDate] = useState<Date>(new Date());
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [calendarKey, setCalendarKey] = useState(0); // Key để force re-render Calendar

    // list danh sách
    const [attendanceStats, setAttendanceStats] = useState([
        { color: "#4CAF50", text: "Đúng giờ", count: null }, // count để sau call từ api
        { color: "#FFC107", text: "Đi muộn, về sớm", count: null },
        { color: "#03A9F4", text: "Làm việc tại nhà", count: null },
        { color: "#9C27B0", text: "Nghỉ phép", count: null },
        { color: "#E91E63", text: "Không phép", count: null }
    ]);

    // Fake data lịch với type annotation
    const attendanceData: Record<string, AttendanceItem> = {
        "2025-02-08": { marked: true, dotColor: "#FFC107" },
        "2025-02-09": { marked: true, dotColor: "#03A9F4" },
        "2025-02-10": { marked: true, dotColor: "#9C27B0" },
        "2025-02-15": { marked: true, dotColor: "#E91E63" },
    };

    const [markedDates, setMarkedDates] = useState<Record<string, MarkedDate>>({});
    const [calendarDate, setCalendarDate] = useState('');

    // Hàm xử lý thay đổi ngày
    const handleDateChange = useCallback((newDate: Date) => {
        setDate(newDate);
        // Cập nhật ngày hiện tại của calendar
        const dateString = newDate.toISOString().split("T")[0];
        setCalendarDate(dateString);
        // Force re-render Calendar để đảm bảo hiển thị đúng tháng
        setCalendarKey(prevKey => prevKey + 1);
    }, []);

    // Effect để cập nhật selectedMonth và markedDates khi date thay đổi
    useEffect(() => {
        // Cập nhật selectedMonth
        setSelectedMonth(date.toLocaleDateString("vi-VN", { month: "long" }));

        // Cập nhật markedDates
        const dateString = date.toISOString().split("T")[0];
        setCalendarDate(dateString);

        // Tạo bản sao của attendanceData
        const newMarkedDates: Record<string, MarkedDate> = {};

        // Sao chép tất cả các mục từ attendanceData
        Object.entries(attendanceData).forEach(([key, value]) => {
            newMarkedDates[key] = { ...value };
        });

        // Xử lý ngày được chọn
        newMarkedDates[dateString] = {
            selected: true,
            selectedColor: "black",
            marked: attendanceData[dateString]?.marked || false,
            dotColor: attendanceData[dateString]?.dotColor
        };

        setMarkedDates(newMarkedDates);
    }, [date]);

    return (
        <View style={styles.container}>
            <Header date={date} onDateChange={handleDateChange} />
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
            <Calendar
                key={calendarKey} // Key để force re-render khi cần
                style={styles.calendar}
                markingType="dot"
                markedDates={markedDates}
                current={calendarDate || date.toISOString().split("T")[0]}
                hideArrows
                firstDay={1}
                theme={{
                    selectedDayBackgroundColor: "#000",
                    todayTextColor: "#000",
                    arrowColor: "#000",
                }}
                onDayPress={(day: { dateString: string }) => {
                    const newDate = new Date(day.dateString);
                    handleDateChange(newDate);
                }}
            />
        </View>
    );
}