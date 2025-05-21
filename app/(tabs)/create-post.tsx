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
import { usePosts } from '@/context/PostsContext';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { FormButton } from '@/components/FormButton';
import { Camera, ImagePlus } from 'lucide-react-native';

export default function CreatePostScreen() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { addPost } = usePosts();
  const { currentUser } = useAuth();

  const STRINGS = useStrings();

  const handleCreatePost = async () => {
    if (!text.trim()) {
      setError(STRINGS.createPost.emptyText);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPost = {
        id: `post-${Date.now()}`,
        userId: currentUser?.id || '',
        userName: currentUser?.name || '',
        userAvatar: currentUser?.avatar || '',
        content: text,
        imageUrl: imageUrl || null,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: [],
      };

      addPost(newPost);
      setText('');
      setImageUrl('');
      router.push('/(tabs)');
    } catch (err) {
      setError(STRINGS.createPost.postFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectImage = () => {
    setImageUrl(
      'https://images.pexels.com/photos/1021756/pexels-photo-1021756.jpeg'
    );
  };

  const handleTakePhoto = () => {
    setImageUrl(
      'https://images.pexels.com/photos/1646313/pexels-photo-1646313.jpeg'
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Header title={STRINGS.createPost.title} showBackButton />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          <Text style={styles.label}>{STRINGS.createPost.contentLabel}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={STRINGS.createPost.contentPlaceholder}
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={5}
            maxLength={500}
          />

          <View style={styles.imageSection}>
            <Text style={styles.label}>{STRINGS.createPost.imageLabel}</Text>

            <View style={styles.imageButtons}>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={handleSelectImage}
              >
                <ImagePlus size={24} color={COLORS.primary} />
                <Text style={styles.imageButtonText}>
                  {STRINGS.createPost.selectImage}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.imageButton}
                onPress={handleTakePhoto}
              >
                <Camera size={24} color={COLORS.primary} />
                <Text style={styles.imageButtonText}>
                  {STRINGS.createPost.takePhoto}
                </Text>
              </TouchableOpacity>
            </View>

            {imageUrl ? (
              <View style={styles.selectedImageContainer}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.selectedImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setImageUrl('')}
                >
                  <Text style={styles.removeImageText}>
                    {STRINGS.createPost.removeImage}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <FormButton
            title={STRINGS.createPost.submitButton}
            onPress={handleCreatePost}
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
    flexGrow: 1,
    padding: SPACING.lg,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: 16,
    backgroundColor: COLORS.white,
    color: COLORS.text,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: SPACING.lg,
  },
  imageSection: {
    marginBottom: SPACING.lg,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: SPACING.md,
    marginRight: SPACING.md,
    justifyContent: 'center',
  },
  imageButtonText: {
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  selectedImageContainer: {
    marginTop: SPACING.md,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: COLORS.error,
    borderRadius: 16,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  removeImageText: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    color: COLORS.white,
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
});
