import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { useStrings } from '@/constants/strings';
import { SPACING } from '@/constants/spacing';
import { usePosts } from '@/context/PostsContext';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { CommentItem } from '@/components/CommentItem';
import { FormButton } from '@/components/FormButton';
import { LoadingIndicator } from '@/components/LoadingIndicator';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { posts, addComment, likePost } = usePosts();
  const { currentUser } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const post = posts.find((p) => p.id === id);

  const STRINGS = useStrings();

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !post) return;

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const comment = {
        id: `comment-${Date.now()}`,
        userId: currentUser?.id || '',
        userName: currentUser?.name || '',
        userAvatar: currentUser?.avatar || '',
        content: newComment,
        createdAt: new Date().toISOString(),
      };

      addComment(post.id, comment);
      setNewComment('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUserPress = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  const handleLikePost = async () => {
    if (!post) return;

    try {
      likePost(post.id);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <Header title={STRINGS.postDetail.title} showBackButton />
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Header title={STRINGS.postDetail.title} showBackButton />

      <FlatList
        data={post.comments}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.postContainer}>
            <PostCard
              post={post}
              onUserPress={() => handleUserPress(post.userId)}
              onLikePress={handleLikePost}
              expanded
            />

            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>
                {post.comments.length}{' '}
                {post.comments.length === 1
                  ? STRINGS.postDetail.comment
                  : STRINGS.postDetail.comments}
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            onUserPress={() => handleUserPress(item.userId)}
          />
        )}
        ListEmptyComponent={
          post.comments.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {STRINGS.postDetail.noComments}
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder={STRINGS.postDetail.commentPlaceholder}
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !newComment.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSubmitComment}
          disabled={!newComment.trim() || submitting}
        >
          <Text style={styles.sendButtonText}>{STRINGS.postDetail.send}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  postContainer: {
    marginBottom: SPACING.md,
  },
  commentsHeader: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  commentsTitle: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 80,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
  },
  sendButton: {
    marginLeft: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  sendButtonText: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: COLORS.white,
  },
});
