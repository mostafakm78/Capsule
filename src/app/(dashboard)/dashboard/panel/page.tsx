import HomePagePanel from '@/app/components/modules/dashboard/panel/HomePagePanel';
import callApi from '@/app/services/callApi';
import { headers } from 'next/headers';

export default async function Dashboard() {
  const cookieHeader = (await headers()).get('cookie') ?? '';
  const api = callApi({ cookieHeader });

  try {
    const res = await api.get('/capsules');
    return <HomePagePanel capsules={res.data} />;
  } catch {
    return (
      <HomePagePanel
        capsules={{
          items: [],
          pagination: { page: 1, limit: 0, total: 0, pages: 0 },
          sort: 'newest',
          filters: {},
        }}
      />
    );
  }
}
