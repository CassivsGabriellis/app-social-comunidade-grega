import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

interface AppLogoProps {
  size: number;
}

export function AppLogo({ size }: AppLogoProps) {
  const fontSize = size * 0.4;
  const borderRadius = size * 0.25;
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          width: size, 
          height: size, 
          borderRadius 
        }
      ]}
    >
      <Text style={[styles.text, { fontSize }]}>ἙΚ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    fontFamily: 'Roboto-Bold',
    color: COLORS.white,
  },
});