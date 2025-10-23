import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Smartphone, Trash2 } from 'lucide-react';

type UserDetails = {
  id: string;
  email?: string;
  phone?: string;
  created_at: string;
  updated_at?: string;
  last_sign_in_at?: string;
  confirmed_at?: string;
  invited_at?: string;
  confirmation_sent_at?: string;
  app_metadata?: {
    provider?: string;
    providers?: string[];
  };
  banned_until?: string;
};

interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserDetails | null;
  onDelete: (userId: string) => void;
  loading: boolean;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
  open,
  onOpenChange,
  user,
  onDelete,
  loading,
}) => {
  if (!user) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const providers = user.app_metadata?.providers || [];
  const hasEmail = providers.includes('email');
  const hasPhone = providers.includes('phone');
  const hasGoogle = providers.includes('google');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{user.email || user.phone || 'User'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">User</span>
              <span className="font-medium">{user.email || user.phone || '-'}</span>
            </div>
            <Separator />
            
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">User UID</span>
              <span className="font-mono text-sm">{user.id}</span>
            </div>
            <Separator />
            
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Created at</span>
              <span>{formatDate(user.created_at)}</span>
            </div>
            <Separator />
            
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Updated at</span>
              <span>{formatDate(user.updated_at)}</span>
            </div>
            <Separator />
            
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Invited at</span>
              <span>{formatDate(user.invited_at)}</span>
            </div>
            <Separator />
            
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Confirmation sent at</span>
              <span>{formatDate(user.confirmation_sent_at)}</span>
            </div>
            <Separator />
            
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Confirmed at</span>
              <span>{formatDate(user.confirmed_at)}</span>
            </div>
            <Separator />
            
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Last signed in</span>
              <span>{formatDate(user.last_sign_in_at)}</span>
            </div>
            <Separator />
            
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">SSO</span>
              <span>{hasGoogle ? 'Google' : 'Disabled'}</span>
            </div>
          </div>

          {/* Login Methods */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Login Methods</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <div>
                    <span className="font-medium">Email</span>
                    {hasEmail && <span className="text-sm text-muted-foreground ml-2">Auto-confirmed</span>}
                  </div>
                </div>
                <Badge variant={hasEmail ? "default" : "secondary"}>
                  {hasEmail ? 'Active' : 'Not active'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-medium">Phone</span>
                </div>
                <Badge variant={hasPhone ? "default" : "secondary"}>
                  {hasPhone ? 'Active' : 'Not active'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium">Google</span>
                </div>
                <Badge variant={hasGoogle ? "default" : "secondary"}>
                  {hasGoogle ? 'Active' : 'Not active'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Actions</h3>
            
            <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
              <div>
                <h4 className="font-semibold text-destructive">Delete User</h4>
                <p className="text-sm text-muted-foreground">User will no longer have access to your app.</p>
              </div>
              <Button
                variant="destructive"
                onClick={() => {
                  if (confirm('⚠️ Are you sure you want to DELETE this user? This action cannot be undone!')) {
                    onDelete(user.id);
                  }
                }}
                disabled={loading}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete User
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;