import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { formatDistanceToNow } from '@/utils/dateUtils';
import { Notification } from '@/types';
import { MessageSquare, Heart, UserPlus } from 'lucide-react-native';

interface NotificationItemProps {
  notification: Notification;
  onPress: () => void;
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const renderIcon = () => {
    switch (notification.type) {
      case 'like':
        return <Heart size={16} color={COLORS.accent} />;
      case 'comment':
        return <MessageSquare size={16} color={COLORS.primary} />;
      case 'follow':
        return <UserPlus size={16} color={COLORS.success} />;
      default:
        return null;
    }
  };
  
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        !notification.read && styles.unreadContainer
      ]}
      onPress={onPress}
    >
      <Image
        source={{ uri: notification.userAvatar }}
        style={styles.avatar}
      />
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.message}>
            <Text style={styles.userName}>{notification.userName}</Text>
            {' '}{notification.message}
          </Text>
          
          <Text style={styles.time}>{formatDistanceToNow(notification.createdAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadContainer: {
    backgroundColor: COLORS.primaryLight,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.placeholder,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: SPACING.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.xs,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  userName: {
    fontFamily: 'Roboto-Bold',
  },
  time: {
    fontSize: 12,
    fontFamily: 'Roboto-Regular',
    color: COLORS.textSecondary,
  },
});