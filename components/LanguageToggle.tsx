import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { useLanguage } from '@/context/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.option,
          language === 'pt' && styles.selectedOption
        ]}
        onPress={() => setLanguage('pt')}
      >
        <Text 
          style={[
            styles.optionText,
            language === 'pt' && styles.selectedOptionText
          ]}
        >
          PT
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.option,
          language === 'el' && styles.selectedOption
        ]}
        onPress={() => setLanguage('el')}
      >
        <Text 
          style={[
            styles.optionText,
            language === 'el' && styles.selectedOptionText
          ]}
        >
          EL
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: COLORS.background,
    padding: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  option: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 14,
  },
  selectedOption: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: COLORS.text,
  },
  selectedOptionText: {
    color: COLORS.white,
  },
});