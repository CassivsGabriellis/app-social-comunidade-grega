import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { useStrings } from '@/constants/strings';
import { SPACING } from '@/constants/spacing';
import { usePosts } from '@/context/PostsContext';
import { Header } from '@/components/Header';
import { PostCard } from '@/components/PostCard';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { LanguageSelectorButton } from '@/components/LanguageSelectorButton';

export default function HomeScreen() {
  const { posts, loading } = usePosts();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const STRINGS = useStrings();

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handlePostPress = (postId: string) => {
    router.push(`/post/${postId}`);
  };

  const handleUserPress = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <Header
        title={STRINGS.home.title}
        rightComponent={<LanguageSelectorButton />}
      />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => handlePostPress(item.id)}
            onUserPress={() => handleUserPress(item.userId)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{STRINGS.home.emptyFeed}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xxl,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
