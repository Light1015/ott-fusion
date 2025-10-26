import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export type Category = { id: string; name: string; created_at?: string };

interface Props {
  initial?: string;
  onSubmit: (name: string) => Promise<void> | void;
  submitLabel?: string;
}

const NAME_RE = /^\S.{0,48}\S$/; // 2-50 chars, no leading/trailing space

const CategoryForm: React.FC<Props> = ({ initial = '', onSubmit, submitLabel = 'Thêm' }) => {
  const [value, setValue] = React.useState(initial);
  const [saving, setSaving] = React.useState(false);

  const handle = async () => {
    const v = value.trim();
    if (!v || v.length < 2 || v.length > 50) {
      toast({ title: 'Lỗi', description: 'Tên phân loại phải từ 2 đến 50 ký tự', variant: 'destructive' });
      return;
    }
    if (!NAME_RE.test(v)) {
      toast({ title: 'Lỗi', description: 'Tên phân loại không hợp lệ', variant: 'destructive' });
      return;
    }
    setSaving(true);
    try {
      await onSubmit(v);
      setValue('');
    } catch (err) {
      const e = err as Error;
      toast({ title: 'Lỗi', description: e?.message || 'Không thể lưu phân loại', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-3">
      <Input placeholder="Tên phân loại" value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="flex justify-end">
        <Button onClick={handle} disabled={saving}>{saving ? 'Đang lưu...' : submitLabel}</Button>
      </div>
    </div>
  );
};

export default CategoryForm;
