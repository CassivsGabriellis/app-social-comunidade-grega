import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react-native';

export function LanguageSelectorButton() {
  const { toggleLanguageModal } = useLanguage();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={toggleLanguageModal}
    >
      <Globe size={24} color={COLORS.text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});