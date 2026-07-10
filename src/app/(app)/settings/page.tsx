// src/app/(app)/settings/page.tsx
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserProfileForm } from '@/components/user/user-profile-form';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Settings</CardTitle>
          <CardDescription>
            Manage your account settings, profile information, and preferences.
          </CardDescription>
        </CardHeader>
      </Card>
      <UserProfileForm />
    </div>
  );
}
