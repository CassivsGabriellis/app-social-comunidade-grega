import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { useStrings } from '@/constants/strings';
import { SPACING } from '@/constants/spacing';
import { useAuth } from '@/context/AuthContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { FormButton } from '@/components/FormButton';
import { AppLogo } from '@/components/AppLogo';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { signIn } = useAuth();

  const STRINGS = useStrings();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(STRINGS.login.emptyFields);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError(STRINGS.login.invalidCredentials);
    } finally {
      setLoading(false);
    }
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

        <AppLogo size={120} />

        <Text style={styles.title}>{STRINGS.login.title}</Text>
        <Text style={styles.subtitle}>{STRINGS.login.subtitle}</Text>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{STRINGS.login.emailLabel}</Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.login.emailPlaceholder}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{STRINGS.login.passwordLabel}</Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.login.passwordPlaceholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Link href="/auth/forgot-password" asChild>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>
                  {STRINGS.login.forgotPassword}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <FormButton
            title={STRINGS.login.submitButton}
            onPress={handleLogin}
            loading={loading}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>{STRINGS.login.noAccount} </Text>
            <Link href="/auth/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.signupLink}>
                  {STRINGS.login.signupLink}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
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
  forgotPassword: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: COLORS.primary,
    textAlign: 'right',
    marginTop: SPACING.xs,
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  signupText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
  },
  signupLink: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.primary,
  },
});
