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
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { useStrings } from '@/constants/strings';
import { SPACING } from '@/constants/spacing';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/PostsContext';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { LanguageSelectorButton } from '@/components/LanguageSelectorButton';
import { Settings, Camera, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { currentUser, signOut } = useAuth();
  const { posts } = usePosts();
  const router = useRouter();

  const STRINGS = useStrings();

  const userPosts = posts.filter((post) => post.userId === currentUser?.id);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  const handleChangePhoto = () => {};

  const handleLogout = () => {
    signOut();
    router.replace('/auth/login');
  };

  const handlePostPress = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  return (
    <View style={styles.container}>
      <Header
        title={STRINGS.profile.title}
        rightComponent={
          <View style={styles.headerButtons}>
            <LanguageSelectorButton />
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={handleEditProfile}
            >
              <Settings size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        }
      />

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
            <Image
              source={{ uri: currentUser?.avatar }}
              style={styles.avatar}
            />
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleChangePhoto}
            >
              <Camera size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{currentUser?.name}</Text>
            <Text style={styles.email}>{currentUser?.email}</Text>

            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userPosts.length}</Text>
                <Text style={styles.statLabel}>{STRINGS.profile.posts}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {currentUser?.followers || 0}
                </Text>
                <Text style={styles.statLabel}>
                  {STRINGS.profile.followers}
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {currentUser?.following || 0}
                </Text>
                <Text style={styles.statLabel}>
                  {STRINGS.profile.following}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>{STRINGS.profile.logout}</Text>
        </TouchableOpacity>

        <View style={styles.postsContainer}>
          <Text style={styles.sectionTitle}>{STRINGS.profile.yourPosts}</Text>

          {userPosts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{STRINGS.profile.noPosts}</Text>
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    marginLeft: SPACING.md,
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
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  email: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    minWidth: 40,
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
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: COLORS.error,
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
