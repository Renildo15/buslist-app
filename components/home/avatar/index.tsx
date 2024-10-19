
import React from 'react';
import { Image } from 'react-native';

interface IAvatarProps {
    width: number;
    height: number;
    borderRadius: number;
    uri: string;
}

export default function Avatar(props: IAvatarProps) {
    return (
        <Image
            style={{
                width: props.width,
                height: props.height,
                borderRadius: props.borderRadius,
            }}
            source={{uri: props.uri}}
        />
    )
}