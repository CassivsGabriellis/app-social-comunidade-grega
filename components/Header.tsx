import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { ArrowLeft } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
}

export function Header({ title, showBackButton, rightComponent }: HeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <View 
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'ios' ? insets.top : SPACING.md }
      ]}
    >
      <View style={styles.content}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
          >
            <ArrowLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
        )}
        
        <Text 
          style={[
            styles.title,
            { marginLeft: showBackButton ? SPACING.md : 0 }
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        
        <View style={styles.rightContainer}>
          {rightComponent}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});