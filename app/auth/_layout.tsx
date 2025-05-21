import { Stack } from 'expo-router';
import { useStrings } from '@/constants/strings';

export default function AuthLayout() {
  const STRINGS = useStrings();

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: STRINGS.login.title,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: STRINGS.signup.title,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          title: STRINGS.forgotPassword.title,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
