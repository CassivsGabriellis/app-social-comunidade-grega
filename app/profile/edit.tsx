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
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { useStrings } from '@/constants/strings';
import { SPACING } from '@/constants/spacing';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { FormButton } from '@/components/FormButton';
import { Camera } from 'lucide-react-native';

export default function EditProfileScreen() {
  const { currentUser, updateUser } = useAuth();
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const STRINGS = useStrings();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleUpdateProfile = async () => {
    if (!name.trim()) {
      setError(STRINGS.editProfile.emptyName);
      return;
    }

    if (!email.trim()) {
      setError(STRINGS.editProfile.emptyEmail);
      return;
    }

    if (!validateEmail(email)) {
      setError(STRINGS.editProfile.invalidEmail);
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError(STRINGS.editProfile.passwordTooShort);
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError(STRINGS.editProfile.passwordsDoNotMatch);
      return;
    }

    if (newPassword && !currentPassword) {
      setError(STRINGS.editProfile.currentPasswordRequired);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!currentUser?.id) {
        setError('ID do usuário não encontrado.');
        return;
      }

      updateUser({
        ...currentUser,
        name,
        email,
        avatar,
      });

      setSuccess(STRINGS.editProfile.profileUpdated);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(STRINGS.editProfile.updateFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeAvatar = () => {
    const avatars = [
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    ];

    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setAvatar(randomAvatar);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Header title={STRINGS.editProfile.title} showBackButton />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {success && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>{success}</Text>
          </View>
        )}

        <View style={styles.avatarSection}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={handleChangeAvatar}
          >
            <Camera size={20} color={COLORS.white} />
            <Text style={styles.changePhotoText}>
              {STRINGS.editProfile.changePhoto}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>
            {STRINGS.editProfile.personalInfo}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{STRINGS.editProfile.nameLabel}</Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.editProfile.namePlaceholder}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{STRINGS.editProfile.emailLabel}</Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.editProfile.emailPlaceholder}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>
            {STRINGS.editProfile.changePassword}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {STRINGS.editProfile.currentPasswordLabel}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.editProfile.currentPasswordPlaceholder}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {STRINGS.editProfile.newPasswordLabel}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.editProfile.newPasswordPlaceholder}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {STRINGS.editProfile.confirmPasswordLabel}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={STRINGS.editProfile.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <FormButton
            title={STRINGS.editProfile.saveButton}
            onPress={handleUpdateProfile}
            loading={loading}
          />
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
    padding: SPACING.lg,
  },
  errorContainer: {
    backgroundColor: COLORS.errorLight,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  successContainer: {
    backgroundColor: COLORS.successLight,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  successText: {
    color: COLORS.success,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.placeholder,
    marginBottom: SPACING.md,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  },
  changePhotoText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: COLORS.white,
    marginLeft: SPACING.xs,
  },
  form: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
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
});
