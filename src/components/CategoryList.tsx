import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import type { Category } from './CategoryForm';

interface Props {
  categories: Category[];
  onEdit: (id: string, newName: string) => Promise<void> | void;
  onDelete: (id: string, name: string) => Promise<void> | void;
  countItems: (categoryName: string) => number;
}

const CategoryList: React.FC<Props> = ({ categories, onEdit, onDelete, countItems }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>Tên phân loại</TableHead>
          <TableHead>Số mục</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((c, idx) => (
          <TableRow key={c.id}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{c.name}</TableCell>
            <TableCell>{countItems(c.name)}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" size="sm" onClick={async () => {
                  const v = prompt('Sửa tên phân loại', c.name);
                  if (v && v.trim() && v.trim() !== c.name) await onEdit(c.id, v.trim());
                }}>
                  <Edit className="w-4 h-4 mr-1" />Sửa
                </Button>
                <Button variant="destructive" size="sm" onClick={async () => {
                  if (!confirm(`Bạn có chắc muốn xóa phân loại "${c.name}" và tất cả mục thuộc nó?`)) return;
                  await onDelete(c.id, c.name);
                }}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryList;
