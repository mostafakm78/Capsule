import AdminCategoriesIndex from '@/app/components/modules/dashboard/admin/categories/AdminCategoriesIndex';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'دسته‌بندی های سایت',
};

export default function AdminCategories() {
  return <AdminCategoriesIndex />;
}
