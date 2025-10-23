import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Ban, UserCheck, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type AuthUser = {
  id: string;
  email?: string;
  created_at: string;
  banned_until?: string;
};

const UsersAdminPage: React.FC = () => {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    // Note: In a real scenario, you'd need a server-side function to list auth.users
    // For now, we'll show a message about this limitation
    setLoading(false);
    toast({
      title: "Thông báo",
      description: "Để hiển thị danh sách người dùng từ auth.users, cần tạo edge function với service_role key",
      variant: "default",
    });
  };

  const handleBanUser = async (userId: string) => {
    if (!confirm('Bạn có chắc muốn chặn người dùng này?')) return;

    setLoading(true);
    // This would need to be implemented via edge function with service_role
    toast({
      title: "Chức năng đang phát triển",
      description: "Cần edge function với service_role để chặn người dùng",
      variant: "default",
    });
    setLoading(false);
  };

  const handleUnbanUser = async (userId: string) => {
    if (!confirm('Bạn có chắc muốn gỡ chặn người dùng này?')) return;

    setLoading(true);
    // This would need to be implemented via edge function with service_role
    toast({
      title: "Chức năng đang phát triển",
      description: "Cần edge function với service_role để gỡ chặn người dùng",
      variant: "default",
    });
    setLoading(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('⚠️ CẢNH BÁO: Bạn có chắc muốn XÓA VĨNH VIỄN người dùng này? Hành động này không thể hoàn tác!')) return;

    setLoading(true);
    // This would need to be implemented via edge function with service_role
    toast({
      title: "Chức năng đang phát triển",
      description: "Cần edge function với service_role để xóa người dùng",
      variant: "default",
    });
    setLoading(false);
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              placeholder="Tìm theo email hoặc User ID..."
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
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              <strong>Lưu ý:</strong> Để quản lý người dùng từ bảng auth.users, bạn cần tạo một Supabase Edge Function với service_role key. 
              Client-side không thể truy cập trực tiếp vào bảng auth.users vì lý do bảo mật.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-8">Đang tải...</div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  Chưa có người dùng hoặc cần triển khai edge function để hiển thị
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground">{user.email || 'Không có email'}</div>
                      <div className="font-mono text-xs text-muted-foreground truncate">{user.id}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Tham gia: {new Date(user.created_at).toLocaleDateString()}
                      </div>
                      {user.banned_until && (
                        <Badge variant="destructive" className="mt-2">
                          Bị chặn đến {new Date(user.banned_until).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {user.banned_until ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnbanUser(user.id)}
                          disabled={loading}
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Gỡ chặn
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBanUser(user.id)}
                          disabled={loading}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          Chặn
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <h3 className="font-semibold text-foreground mb-2">Hướng dẫn triển khai:</h3>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Tạo Supabase Edge Function với service_role key</li>
          <li>Edge function sẽ query auth.users table</li>
          <li>Triển khai các chức năng ban/unban/delete user qua Admin API</li>
          <li>Gọi edge function từ frontend này</li>
        </ol>
      </div>
    </>
  );
};

export default UsersAdminPage;

