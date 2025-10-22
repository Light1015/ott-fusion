import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type UserRole = {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
};

const UsersAdminPage: React.FC = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [newUserId, setNewUserId] = useState('');
  const [newRole, setNewRole] = useState<'user' | 'moderator' | 'admin'>('user');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching roles', error);
    } else {
      setRoles(data as UserRole[]);
    }
    setLoading(false);
  };

  const handleAddRole = async () => {
    if (!newUserId || !newRole) return;
    setLoading(true);
    const { error } = await supabase
      .from('user_roles')
      .insert([{ user_id: newUserId, role: newRole } as { user_id: string; role: 'user' | 'moderator' | 'admin' }]);

    if (error) console.error('Error adding role', error);
    else {
      setNewUserId('');
      fetchRoles();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const { error } = await supabase.from('user_roles').delete().eq('id', id);
    if (error) console.error('Error deleting role', error);
    else fetchRoles();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background md:pl-64 pt-24 px-4 md:px-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Quản lý Người dùng & Roles</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Thêm Role</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input
                  placeholder="User ID (UUID từ Supabase Auth)"
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                />
                <select
                  className="w-full p-2 rounded border border-border bg-background text-foreground"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as 'user' | 'moderator' | 'admin')}
                >
                  <option value="user">user</option>
                  <option value="moderator">moderator</option>
                  <option value="admin">admin</option>
                </select>
                <div className="flex justify-end">
                  <Button onClick={handleAddRole} disabled={loading}>
                    Thêm
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Lưu ý: Client không thể liệt kê `auth.users` (email) do hạn chế client-side. Nếu bạn cần
                  hiển thị email, tạo bảng `profiles` mirror email hoặc cung cấp endpoint server-side sử dụng service_role.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Danh sách Roles</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div>Đang tải...</div>
                ) : (
                  <div className="space-y-3">
                    {roles.length === 0 && <div className="text-muted-foreground">Không có dữ liệu</div>}
                    {roles.map((r) => (
                      <div key={r.id} className="flex items-center justify-between p-3 rounded border border-border">
                        <div>
                          <div className="font-medium text-foreground">{r.user_id}</div>
                          <div className="text-xs text-muted-foreground">{r.role} • {new Date(r.created_at).toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="destructive" onClick={() => handleDelete(r.id)}>
                            Xóa
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersAdminPage;
