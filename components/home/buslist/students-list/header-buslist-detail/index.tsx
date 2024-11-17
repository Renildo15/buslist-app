import { View, Text } from "@/components/Themed"
import {styles} from "./styles"
import { formatDate } from "@/utils"

interface IHeaderStudentsListProps {
    name: string
    list_date: string,
    is_enable: boolean
}

export default function HeaderStudentsList({name, is_enable, list_date}: IHeaderStudentsListProps) {
    return (
        <View style={styles.header_container}>
            <View style={styles.header_content}>
                <Text style={{fontWeight:"bold"}}>{ name }</Text>
                <Text>{ formatDate(list_date) }</Text>
                <View style={{borderRadius:10, width:10, height: 10, backgroundColor: is_enable ? 'green': 'red'}}></View>
            </View>
        </View>
    )
}