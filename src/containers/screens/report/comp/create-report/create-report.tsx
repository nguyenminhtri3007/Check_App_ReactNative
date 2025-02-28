import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DatePicker from "react-native-date-picker";
import { styles } from "./create-report.style";

// chọn đơn báo
const DropdownComponent = (
    { selectedValue, setSelectedValue }:
        { selectedValue: string; setSelectedValue: (value: string) => void }
) => {
    return (
        <View style={styles.header}>
            <Text style={styles.label}>Loại đơn báo</Text>
            <View style={styles.inputWrapper}>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedValue(value)}
                    items={[
                        { label: "Đi làm muộn", value: "1" },
                        { label: "Nghỉ phép 1 ngày", value: "2" },
                        { label: "Nghỉ phép 1/2 ngày (sáng)", value: "3" },
                        { label: "Nghỉ phép 1/2 ngày (chiều)", value: "4" },
                        { label: "Làm việc tại nhà", value: "5" },
                    ]}
                    placeholder={{ label: "Chọn", value: "0" }}
                    style={{
                        inputAndroid: styles.inputText,
                        iconContainer: styles.iconContainer,
                    }}
                    value={selectedValue}
                />
            </View>
        </View>
    );
};


// chọn thời gian
const DatePickerDay = (
    { selectedDate, setSelectedDate }
        : { selectedDate: Date | null, setSelectedDate: (text: Date) => void }
) => {
    const [open, setOpen] = useState(false);
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
    return (
        <View style={styles.date}>
            <Text style={styles.dateText}>Thời gian</Text>
            <View style={styles.inputDatePicker}>
                <TextInput
                    style={styles.input}
                    value={selectedDate ? convertDate(selectedDate) : "- -/- -/- - - -"}
                    editable={false}
                />
                <TouchableOpacity onPress={() => setOpen(true)} style={styles.iconDate}>
                    <MaterialIcons name="calendar-today" size={24} color="#FD4E20" />
                </TouchableOpacity>
            </View>
            <DatePicker
                modal
                open={open}
                date={selectedDate || new Date()}
                mode="date"
                minimumDate={new Date()}
                locale="vi"
                buttonColor="red"
                title="Chọn ngày"
                cancelText="Hủy bỏ"
                confirmText="Xác nhận"
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setSelectedDate(selectedDate);
                    convertDate(selectedDate);
                }}
                onCancel={() => setOpen(false)}
            />
        </View>
    );
};


// ghi chú
type NoteHomeProps = {
    note: string;
    setNote: (text: string) => void;
};

const NoteHome = ({ note, setNote }: NoteHomeProps) => {
    return (
        <View style={styles.note}>
            <Text style={styles.noteText}>Ghi chú</Text>
            <View style={styles.inputNote}>
                <TextInput
                    style={styles.inputNoteHome}
                    value={note}
                    onChangeText={setNote}
                    placeholder="Nhập ghi chú..."
                />
            </View>
        </View>
    );
};

// gửi thông tin
type SubmitProps = {
    onSubmit: () => void;
};

const Submit = ({ onSubmit }: SubmitProps) => {
    return (
        <View style={styles.submitContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
                <Text style={styles.submitText}>Gửi</Text>
            </TouchableOpacity>
        </View>
    );
};



export const CreateReportComponent = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [note, setNote] = useState("");

    const [errors, setErrors] = useState({
        selectedValue: "",
        selectedDate: "",
        note: "",
    });

    const handleSubmit = () => {
        let hasError = false;
        let newErrors = { selectedValue: "", selectedDate: "", note: "" };

        if (!selectedValue) {
            newErrors.selectedValue = " Loại đơn báo không được để trống!";
            hasError = true;
        }
        if (!selectedDate) {
            newErrors.selectedDate = " Thời gian không được để trống!";
            hasError = true;
        }
        if (!note.trim()) {
            newErrors.note = " Ghi chú không được để trống!";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        const reportData = {
            type: selectedValue,
            date: selectedDate ? selectedDate.toISOString() : "",
            note: note.trim(),
        };

        console.log("Dữ liệu gửi đi:", reportData);
        Alert.alert("Thành công", " đã được gửi!");

        setSelectedValue("");
        setSelectedDate(null);
        setNote("");
        setErrors({ selectedValue: "", selectedDate: "", note: "" });
    };

    return (
        <View style={styles.container}>
            <DropdownComponent selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
            {errors.selectedValue ? <Text style={styles.errorText}>{errors.selectedValue}</Text> : null}
            <DatePickerDay selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            {errors.selectedDate ? <Text style={styles.errorText}>{errors.selectedDate}</Text> : null}
            <NoteHome note={note} setNote={setNote} />
            {errors.note ? <Text style={styles.errorText}>{errors.note}</Text> : null}
            <Submit onSubmit={handleSubmit} />
        </View>
    );
};
