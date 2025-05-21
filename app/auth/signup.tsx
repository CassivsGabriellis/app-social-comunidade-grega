import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { signUp } = useAuth();

  const STRINGS = useStrings();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError(STRINGS.signup.emptyFields);
      return;
    }

    if (!validateEmail(email)) {
      setError(STRINGS.signup.invalidEmail);
      return;
    }

    if (password !== confirmPassword) {
      setError(STRINGS.signup.passwordsDoNotMatch);
      return;
    }

    if (password.length < 6) {
      setError(STRINGS.signup.passwordTooShort);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await signUp(name, email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError(STRINGS.signup.signupFailed);
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

        <AppLogo size={100} />

        <Text style={styles.title}>{STRINGS.signup.title}</Text>
        <Text style={styles.subtitle}>{STRINGS.signup.subtitle}</Text>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{STRINGS.signup.nameLabel}</Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.signup.namePlaceholder}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{STRINGS.signup.emailLabel}</Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.signup.emailPlaceholder}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{STRINGS.signup.passwordLabel}</Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.signup.passwordPlaceholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {STRINGS.signup.confirmPasswordLabel}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.signup.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <FormButton
            title={STRINGS.signup.submitButton}
            onPress={handleSignup}
            loading={loading}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>{STRINGS.signup.hasAccount} </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>{STRINGS.signup.loginLink}</Text>
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
