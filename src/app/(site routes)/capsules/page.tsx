
import CapsulesIndex from '@/app/components/modules/capeules/CapsulesIndex';
import callApi from '@/app/services/callApi';
import { GetCapsulesResponse } from '@/lib/types';

const emptyCapsules: GetCapsulesResponse = {
  items: [],
  pagination: { page: 1, limit: 4, total: 0, pages: 0 },
  sort: 'newest',
  filters: {},
};

type PageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    q?: string;
    sort?: 'newest' | 'oldest';
    categoryItem?: string;
  }>;
};

export default async function Capsules({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Math.max(1, Number(searchParam?.page) || 1);

  const params: Record<string, number | string> = { page };
  if (searchParam?.limit) params.limit = Number(searchParam.limit);
  if (searchParam?.q) params.q = searchParam?.q;
  if (searchParam?.sort) params.sort = searchParam?.sort;
  if (searchParam?.categoryItem) params.categoryItem = searchParam?.categoryItem;

  try {
    const res = await callApi().get<GetCapsulesResponse>('/public/capsules', { params });
    return <CapsulesIndex capsules={res.data} />;
  } catch {
    return <CapsulesIndex capsules={emptyCapsules} />;
  }
}
