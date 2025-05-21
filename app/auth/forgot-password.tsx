import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { useStrings } from '@/constants/strings';
import { SPACING } from '@/constants/spacing';
import { LanguageToggle } from '@/components/LanguageToggle';
import { FormButton } from '@/components/FormButton';
import { AppLogo } from '@/components/AppLogo';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const STRINGS = useStrings();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError(STRINGS.forgotPassword.emptyEmail);
      return;
    }

    if (!validateEmail(email)) {
      setError(STRINGS.forgotPassword.invalidEmail);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
    } catch (err) {
      setError(STRINGS.forgotPassword.resetFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.replace('/auth/login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.languageContainer}>
          <LanguageToggle />
        </View>

        <AppLogo size={100} />

        <Text style={styles.title}>{STRINGS.forgotPassword.title}</Text>
        <Text style={styles.subtitle}>{STRINGS.forgotPassword.subtitle}</Text>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {success ? (
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>
              {STRINGS.forgotPassword.successTitle}
            </Text>
            <Text style={styles.successText}>
              {STRINGS.forgotPassword.successText}
            </Text>
            <View style={styles.form}>
              <FormButton
                title={STRINGS.forgotPassword.backToLogin}
                onPress={handleBackToLogin}
                loading={false}
              />
            </View>
          </View>
        ) : (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                {STRINGS.forgotPassword.emailLabel}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={STRINGS.forgotPassword.emailPlaceholder}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <FormButton
              title={STRINGS.forgotPassword.submitButton}
              onPress={handleResetPassword}
              loading={loading}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                {STRINGS.forgotPassword.rememberPassword}{' '}
              </Text>
              <Link href="/auth/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>
                    {STRINGS.forgotPassword.loginLink}
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  languageContainer: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginTop: SPACING.lg,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
    textAlign: 'center',
    maxWidth: 400,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    backgroundColor: COLORS.white,
    color: COLORS.text,
  },
  errorContainer: {
    backgroundColor: COLORS.errorLight,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    width: '100%',
    maxWidth: 400,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  successContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginBottom: SPACING.xl,
  },
  successTitle: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: COLORS.success,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.primary,
  },
});
