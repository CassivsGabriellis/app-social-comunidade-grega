import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';

type Language = 'pt' | 'el';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguageModal: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');
  const [showModal, setShowModal] = useState(false);
  
  const toggleLanguageModal = () => {
    setShowModal(!showModal);
  };
  
  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setShowModal(false);
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguageModal }}>
      {children}
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {language === 'pt' ? 'Escolha o idioma' : 'Επιλέξτε γλώσσα'}
            </Text>
            
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => handleSelectLanguage('pt')}
            >
              <View style={styles.languageFlag}>
                <Text style={styles.flagText}>🇧🇷</Text>
              </View>
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>Português</Text>
                <Text style={styles.languageNative}>Português</Text>
              </View>
              {language === 'pt' && <View style={styles.selectedIndicator} />}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => handleSelectLanguage('el')}
            >
              <View style={styles.languageFlag}>
                <Text style={styles.flagText}>🇬🇷</Text>
              </View>
              <View style={styles.languageInfo}>
                <Text style={styles.languageName}>Grego</Text>
                <Text style={styles.languageNative}>Ελληνικά</Text>
              </View>
              {language === 'el' && <View style={styles.selectedIndicator} />}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>
                {language === 'pt' ? 'Fechar' : 'Κλείσιμο'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  languageFlag: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagText: {
    fontSize: 20,
  },
  languageInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: COLORS.text,
  },
  languageNative: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
  },
  selectedIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  closeButton: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.white,
  },
});