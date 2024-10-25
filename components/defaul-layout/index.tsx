import React from 'react';
import Header from '../home/header';
import { View } from '../Themed';
import { styles } from './styles';

interface IDefaultLayoutProps {
  children: React.ReactNode;
  isHeaderVisible?: boolean;
}

export default function DefaultLayout({
  children,
  isHeaderVisible = true,
}: IDefaultLayoutProps) {
  return (
    <View style={styles.container}>
      {isHeaderVisible && <Header />}
      {children}
    </View>
  );
}
