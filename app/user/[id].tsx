import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { useStrings } from '@/constants/strings';
import { SPACING } from '@/constants/spacing';
import { usePosts } from '@/context/PostsContext';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { mockUsers } from '@/data/mockData';
import { UserPlus, UserCheck } from 'lucide-react-native';

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const { posts } = usePosts();
  const { currentUser } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();

  const user = mockUsers.find((u) => u.id === id);

  const userPosts = posts.filter((post) => post.userId === id);

  const STRINGS = useStrings();

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleToggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  const handlePostPress = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Header title={STRINGS.userProfile.title} showBackButton />
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={user.name} showBackButton />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>

            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userPosts.length}</Text>
                <Text style={styles.statLabel}>{STRINGS.profile.posts}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.followers}</Text>
                <Text style={styles.statLabel}>
                  {STRINGS.profile.followers}
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{user.following}</Text>
                <Text style={styles.statLabel}>
                  {STRINGS.profile.following}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.followButton, isFollowing && styles.followingButton]}
          onPress={handleToggleFollow}
        >
          {isFollowing ? (
            <>
              <UserCheck size={20} color={COLORS.primary} />
              <Text style={styles.followingText}>
                {STRINGS.userProfile.following}
              </Text>
            </>
          ) : (
            <>
              <UserPlus size={20} color={COLORS.white} />
              <Text style={styles.followText}>
                {STRINGS.userProfile.follow}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.postsContainer}>
          <Text style={styles.sectionTitle}>{STRINGS.userProfile.posts}</Text>

          {userPosts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {STRINGS.userProfile.noPosts}
              </Text>
            </View>
          ) : (
            userPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPress={() => handlePostPress(post.id)}
                hideUser
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.placeholder,
  },
  profileInfo: {
    flex: 1,
    marginLeft: SPACING.lg,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  bio: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  followingButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  followText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: COLORS.white,
    marginLeft: SPACING.sm,
  },
  followingText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  postsContainer: {
    marginBottom: SPACING.xxl,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  emptyContainer: {
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
