import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';

interface FormButtonProps {
  title: string;
  onPress: () => void;
  loading: boolean;
  disabled?: boolean;
  secondary?: boolean;
}

export function FormButton({ 
  title, 
  onPress, 
  loading, 
  disabled = false,
  secondary = false 
}: FormButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        secondary ? styles.secondaryButton : {},
        (disabled || loading) ? styles.buttonDisabled : {}
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? COLORS.primary : COLORS.white} />
      ) : (
        <Text 
          style={[
            styles.buttonText,
            secondary ? styles.secondaryButtonText : {}
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
    borderColor: COLORS.disabled,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
  secondaryButtonText: {
    color: COLORS.primary,
  },
});