import { View } from "@/components/Themed"
import React from "react"
import ContentLoader, { Rect, Circle, Path , IContentLoaderProps } from "react-content-loader/native"

export default function NoticeSkeleton(props: IContentLoaderProps) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth:1 }}>
            <ContentLoader 
                speed={2}
                width={400}
                height={150}
                viewBox="0 0 290 150"
                backgroundColor="#a8b9e1"
                foregroundColor="#007bff"
                {...props}
            >
                <Circle cx="10" cy="20" r="8" /> 
                <Rect x="25" y="15" rx="5" ry="5" width="220" height="10" /> 
                <Circle cx="10" cy="50" r="8" /> 
                <Rect x="25" y="45" rx="5" ry="5" width="220" height="10" /> 
                <Circle cx="10" cy="80" r="8" /> 
                <Rect x="25" y="75" rx="5" ry="5" width="220" height="10" /> 
                <Circle cx="10" cy="110" r="8" /> 
                <Rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
            </ContentLoader>
        </View>
    )

}