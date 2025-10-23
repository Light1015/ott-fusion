import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, User, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserRole = {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
};

const Manage: React.FC = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [newUserId, setNewUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState<'user' | 'moderator' | 'admin'>('user');
  const { toast } = useToast();

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
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách roles",
        variant: "destructive",
      });
    } else {
      setRoles(data as UserRole[]);
    }
    setLoading(false);
  };

  const handleGrantRole = async () => {
    if (!newUserId.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập User ID",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('user_roles')
      .insert([{ user_id: newUserId.trim(), role: selectedRole }]);

    if (error) {
      toast({
        title: "Lỗi",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thành công",
        description: `Đã cấp quyền ${selectedRole} thành công`,
      });
      setNewUserId('');
      fetchRoles();
    }
    setLoading(false);
  };

  const handleRevokeRole = async (id: string, role: string) => {
    if (!confirm(`Bạn có chắc muốn thu hồi quyền ${role}?`)) return;

    setLoading(true);
    const { error } = await supabase.from('user_roles').delete().eq('id', id);
    
    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể thu hồi quyền",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thành công",
        description: "Đã thu hồi quyền thành công",
      });
      fetchRoles();
    }
    setLoading(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4" />;
      case 'moderator':
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'moderator':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const adminRoles = roles.filter(r => r.role === 'admin');
  const moderatorRoles = roles.filter(r => r.role === 'moderator');
  const userRoles = roles.filter(r => r.role === 'user');

  return (
    <>
      <h1 className="text-3xl font-bold text-foreground mb-6">Quản lý Phân Quyền</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-destructive" />
              Cấp Quyền
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  User ID (UUID)
                </label>
                <Input
                  placeholder="Nhập UUID từ Supabase Auth"
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Vai trò
                </label>
                <select
                  className="w-full p-2 rounded border border-border bg-background text-foreground"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as any)}
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <Button 
                onClick={handleGrantRole} 
                disabled={loading}
                className="w-full"
              >
                Cấp Quyền
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-destructive" />
              Admins ({adminRoles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-muted-foreground">Đang tải...</div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {adminRoles.length === 0 ? (
                  <div className="text-muted-foreground text-sm">Chưa có admin</div>
                ) : (
                  adminRoles.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded border border-border bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs text-foreground truncate">{r.user_id}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(r.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevokeRole(r.id, r.role)}
                      >
                        Thu hồi
                      </Button>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Moderators ({moderatorRoles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-muted-foreground">Đang tải...</div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {moderatorRoles.length === 0 ? (
                  <div className="text-muted-foreground text-sm">Chưa có moderator</div>
                ) : (
                  moderatorRoles.map((r) => (
                    <div key={r.id} className="flex items-center justify-between p-3 rounded border border-border bg-muted/50">
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs text-foreground truncate">{r.user_id}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(r.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevokeRole(r.id, r.role)}
                      >
                        Thu hồi
                      </Button>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-muted-foreground" />
            Tất cả Users có Role ({userRoles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center text-muted-foreground">Đang tải...</div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {userRoles.length === 0 ? (
                <div className="text-muted-foreground text-sm">Chưa có user role</div>
              ) : (
                userRoles.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded border border-border">
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs text-foreground truncate">{r.user_id}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevokeRole(r.id, r.role)}
                    >
                      Thu hồi
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Manage;

