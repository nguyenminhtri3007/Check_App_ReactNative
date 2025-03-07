import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./detail.screen.style";

export const RequestDetailScreen = ({ navigation, route }: any) => {
    const { report } = route.params;
    const reportType: { label: string, value: string }[] = [
        { label: "Đi làm muộn", value: "late" },
        { label: "Nghỉ phép 1 ngày", value: "leave" },
        { label: "Nghỉ phép 1/2 ngày (sáng)", value: "half_day_morning" },
        { label: "Nghỉ phép 1/2 ngày (chiều)", value: "half_day_afternoon" },
        { label: "Làm việc tại nhà", value: "work_from_home" },
        { label: "Xin về sớm", value: "leave_early" },
    ]

    const getLabelRequest = (type: string) => {
        return reportType.find(t => t.value.toLocaleLowerCase() === type.toLocaleLowerCase())?.label ?? '';
    }


    return (
        <View style={styles.container}>
            <View style={{ marginTop: 32, flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 75 }}>
                    <Image source={require('../../../../../../assets/icons/arrowback.png')} style={{ width: 24, height: 24, marginBottom: 7, marginLeft: 24 }} />
                </TouchableOpacity>
                <Text style={styles.title}>Chi tiết đơn báo</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.itemText}>{getLabelRequest(report.type_request ?? '')}</Text>
                <Text style={styles.date}>{report.date_request}</Text>
            </View>

            <Text style={styles.sectionTitle}>Ghi chú</Text>
            <Text style={styles.note}>{report.reason_request || "Không có ghi chú"}</Text>
        </View>
    );
};
