
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { styles } from "./report-screen.style"
import { RequestService } from "../../../data/services/request.service";
import { RequestModel } from "../../../data/model/request.model";

const Header = ({ navigation }: { navigation: any }) => {
    const handlePress = () => {
        navigation.navigate("create-report")
    };

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Đơn Báo</Text>
            <TouchableOpacity style={styles.icon} onPress={() => handlePress()}>
                <Text style={styles.createText}>Tạo đơn báo</Text>
                <Image source={require("../../../../assets/icons/create.png")} style={styles.logo} />
            </TouchableOpacity>
        </View>
    );
};

const ReportScreen = (props: any) => {
    const { navigation } = props;
    const [items, setItems] = useState<RequestModel[]>([]);
    const fetchData = async () => {
        // setLoading(true);
        try {
            const requestService = new RequestService();
            const data = await requestService.getRequests();
            setItems(data);
        } catch (error) {
            Alert.alert("Lỗi", "Không thể tải danh sách đơn báo.");
            console.error("Error fetching data:", error);
        }
    };

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

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView style={{ flex: 1, marginLeft: 24 }}>
                {
                    items.map((report: RequestModel) => (
                        <TouchableOpacity onPress={() => navigation.navigate('detail-screen', { report })}
                            style={styles.item}
                            key={`${report.id}`}
                        >
                            <Text style={styles.itemText}>{getLabelRequest(report.type_request ?? '')}</Text>
                            <Text style={{ marginTop: 5 }}>{report.date_request} </Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    );
};
export default ReportScreen;