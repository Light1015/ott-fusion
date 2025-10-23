import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Ban, UserCheck, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import UserDetailsDialog from '@/components/UserDetailsDialog';

type AuthUser = {
  id: string;
  email?: string;
  phone?: string;
  created_at: string;
  banned_until?: string;
  last_sign_in_at?: string;
  app_metadata?: {
    provider?: string;
    providers?: string[];
  };
};

const UsersAdminPage: React.FC = () => {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<AuthUser | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('admin-users', {
        body: { action: 'list' },
      });

      if (error) throw error;

      setUsers(data.users || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Lỗi",
        description: error.message || "Không thể tải danh sách người dùng",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (user: AuthUser) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };

  const handleBanUser = async (userId: string) => {
    if (!confirm('Bạn có chắc muốn chặn người dùng này?')) return;

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('admin-users', {
        body: { action: 'ban', userId },
      });

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã chặn người dùng",
      });
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể chặn người dùng",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUnbanUser = async (userId: string) => {
    if (!confirm('Bạn có chắc muốn gỡ chặn người dùng này?')) return;

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('admin-users', {
        body: { action: 'unban', userId },
      });

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã gỡ chặn người dùng",
      });
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể gỡ chặn người dùng",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('admin-users', {
        body: { action: 'delete', userId },
      });

      if (error) throw error;

      toast({
        title: "Thành công",
        description: "Đã xóa người dùng",
      });
      setDetailsOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: error.message || "Không thể xóa người dùng",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (email?: string, phone?: string) => {
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    if (phone) {
      return phone.charAt(0);
    }
    return 'U';
  };

  const getLoginMethods = (user: AuthUser) => {
    const providers = user.app_metadata?.providers || [];
    const methods: string[] = [];
    if (providers.includes('email')) methods.push('Email');
    if (providers.includes('phone')) methods.push('Phone');
    if (providers.includes('google')) methods.push('Google');
    return methods.length > 0 ? methods.join(', ') : '-';
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-foreground mb-6">Quản lý Người Dùng</h1>

      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle>Tìm kiếm Người Dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo email, số điện thoại hoặc User ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Danh sách Người Dùng</span>
            <Badge variant="secondary">{filteredUsers.length} người dùng</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-muted-foreground py-8">Đang tải...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              Không tìm thấy người dùng
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Tên người dùng</TableHead>
                    <TableHead>Email/Phone</TableHead>
                    <TableHead>Phương thức đăng nhập</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(user.email, user.phone)}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {user.email?.split('@')[0] || user.phone || 'User'}
                        </div>
                        {user.banned_until && (
                          <Badge variant="destructive" className="mt-1">
                            Bị chặn
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{user.email || user.phone || '-'}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{getLoginMethods(user)}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(user)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Chi tiết
                          </Button>
                          {user.banned_until ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUnbanUser(user.id)}
                              disabled={loading}
                            >
                              <UserCheck className="w-4 h-4 mr-1" />
                              Gỡ chặn
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleBanUser(user.id)}
                              disabled={loading}
                            >
                              <Ban className="w-4 h-4 mr-1" />
                              Chặn
                            </Button>
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (confirm('⚠️ Bạn có chắc muốn XÓA người dùng này?')) {
                                handleDeleteUser(user.id);
                              }
                            }}
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <UserDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        user={selectedUser}
        onDelete={handleDeleteUser}
        loading={loading}
      />
    </>
  );
};

export default UsersAdminPage;

