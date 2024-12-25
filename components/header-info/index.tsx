import { TouchableOpacity } from "react-native";
import Avatar from "../home/avatar";
import Feather from "@expo/vector-icons/Feather";
import { View, Text } from "../Themed";
import { styles } from "./styles";
import { IUserStudent } from "@/api/interfaces/user";

interface IHeaderInfoProps {
    user: IUserStudent | undefined;
    handleSelectImage?: () => Promise<void>;
    avatarUri: string;
    iconIsVisible: boolean;
}

export default function HeaderInfo({ user, handleSelectImage, avatarUri, iconIsVisible }: IHeaderInfoProps) {
    return (
        <View style={styles.avatar_container}>
          <TouchableOpacity
            style={styles.camera_icon}
            onPress={handleSelectImage}
            activeOpacity={iconIsVisible ? 0.8 : 1}
          >
            <Avatar
              height={70}
              width={70}
              borderRadius={50}
              uri={avatarUri ?? ''}
            />
            { iconIsVisible ? (
                <Feather
                    name="camera"
                    size={20}
                    color="#007bff"
                    style={styles.camera_icon_position}
                />
            ) : (
                null
            )}
            
          </TouchableOpacity>
          <View style={styles.student_info_box}>
            <Text>
              {user?.first_name} {user?.last_name}
            </Text>
            <Text
              style={{ fontSize: 12, fontWeight: 'semibold', color: 'gray' }}
            >
              {user?.profile?.matric_number}
            </Text>
          </View>
        </View>
    )
}