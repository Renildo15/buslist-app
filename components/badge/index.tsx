import { View, Text } from "../Themed"

interface IBadgeProps {
    text: string
    color: string
  }
  
  export default function Badge({text, color}: IBadgeProps) {
    return(
      <View style={{backgroundColor: color, borderRadius: "10%", padding: 3}}>
        <Text style={{color:"white"}}>{text}</Text>
      </View>
    )
  }