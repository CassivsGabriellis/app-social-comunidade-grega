import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { Post } from '@/types';
import { formatDistanceToNow } from '@/utils/dateUtils';
import { Heart, MessageSquare, Share2 } from 'lucide-react-native';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
  onUserPress?: () => void;
  onLikePress?: () => void;
  hideUser?: boolean;
  expanded?: boolean;
}

export function PostCard({
  post,
  onPress,
  onUserPress,
  onLikePress,
  hideUser = false,
  expanded = false,
}: PostCardProps) {
  const [liked, setLiked] = useState(false);

  const handleLikePress = () => {
    setLiked((prev) => !prev);
    onLikePress?.();
  };

  const handleShare = () => {};

  return (
    <View style={styles.container}>
      {!hideUser && (
        <TouchableOpacity style={styles.userContainer} onPress={onUserPress}>
          <Image source={{ uri: post.userAvatar }} style={styles.avatar} />

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{post.userName}</Text>
            <Text style={styles.time}>
              {formatDistanceToNow(post.createdAt)}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.contentContainer}
        onPress={onPress}
        activeOpacity={onPress ? 0.8 : 1}
      >
        <Text style={styles.content} numberOfLines={expanded ? undefined : 4}>
          {post.content}
        </Text>

        {post.imageUrl && (
          <Image
            source={{ uri: post.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
          <Heart
            size={20}
            color={liked ? COLORS.accent : COLORS.textSecondary}
            fill={liked ? COLORS.accent : 'transparent'}
          />
          <Text style={[styles.actionText, liked && { color: COLORS.accent }]}>
            {post.likes + (liked ? 1 : 0)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onPress}>
          <MessageSquare size={20} color={COLORS.textSecondary} />
          <Text style={styles.actionText}>{post.comments?.length || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Share2 size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.placeholder,
  },
  userInfo: {
    marginLeft: SPACING.md,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
  },
  time: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
  },
  contentContainer: {
    padding: SPACING.md,
    paddingTop: SPACING.sm,
  },
  content: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: COLORS.placeholder,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    color: COLORS.textSecondary,
  },
});
