import { IUserStudent } from "@/api/interfaces/user";
import Avatar from "@/components/home/avatar";
import { View, Text } from "@/components/Themed";
import { styles } from "./styles";

interface ICardStudentProps {
    student: IUserStudent
    end_class_time: string
    is_return: boolean
}

export default function CardStudent(props: ICardStudentProps){
    return (
       <View style={styles.card_container}>
         <View style={styles.card_content}>
            <View style={styles.card_content_info}>
                <Avatar
                    borderRadius={20}
                    width={40}
                    height={40}
                    uri={props.student?.profile.avatar}
                />
                <Text>{ props.student?.first_name}</Text>
                {props.is_return ? (
                    <Text>{props.end_class_time}</Text>
                ) : (
                    <Text>Não volta</Text>
                )}
            </View>
            <View>
                <Text>{props.student?.profile.institution}</Text>
            </View>
        </View>
       </View>
    )
}