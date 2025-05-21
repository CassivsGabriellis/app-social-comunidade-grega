import { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { useStrings } from '@/constants/strings';
import { SPACING } from '@/constants/spacing';
import { Header } from '@/components/Header';
import { NotificationItem } from '@/components/NotificationItem';
import { LanguageSelectorButton } from '@/components/LanguageSelectorButton';
import { mockNotifications } from '@/data/mockData';

export default function NotificationsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const router = useRouter();

  const STRINGS = useStrings();

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleNotificationPress = (notification: any) => {
    if (notification.type === 'like' || notification.type === 'comment') {
      router.push(`/post/${notification.postId}`);
    } else if (notification.type === 'follow') {
      router.push(`/user/${notification.userId}`);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={STRINGS.notifications.title}
        rightComponent={<LanguageSelectorButton />}
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => handleNotificationPress(item)}
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
            <Text style={styles.emptyText}>
              {STRINGS.notifications.emptyNotifications}
            </Text>
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
