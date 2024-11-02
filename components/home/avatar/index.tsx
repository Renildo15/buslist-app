import { apiUri } from '@/api/uri';
import React from 'react';
import { Image } from 'react-native';

interface IAvatarProps {
  width: number;
  height: number;
  borderRadius: number;
  uri: string;
}

export default function Avatar(props: IAvatarProps) {
  const img = props.uri
    ? props.uri.includes('file')
      ? { uri: props.uri }
      : { uri: `${apiUri}/${props.uri}` }
    : require('../../../assets/images/avatar.jpg');
  return (
    <Image
      style={{
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
        borderWidth: 1,
        borderColor: 'white',
      }}
      source={img}
    />
  );
}
