import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { formatDistanceToNow } from '@/utils/dateUtils';
import { Comment } from '@/types';

interface CommentItemProps {
  comment: Comment;
  onUserPress?: () => void;
}

export function CommentItem({ comment, onUserPress }: CommentItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onUserPress}>
        <Image source={{ uri: comment.userAvatar }} style={styles.avatar} />
      </TouchableOpacity>

      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <TouchableOpacity onPress={onUserPress}>
            <Text style={styles.userName}>{comment.userName}</Text>
          </TouchableOpacity>
          <Text style={styles.time}>
            {formatDistanceToNow(comment.createdAt)}
          </Text>
        </View>

        <Text style={styles.commentText}>{comment.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.placeholder,
  },
  commentContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
  },
  time: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
  },
  commentText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    lineHeight: 20,
  },
});
