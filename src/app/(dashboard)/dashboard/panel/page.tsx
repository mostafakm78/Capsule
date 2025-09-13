import HomePagePanel from '@/app/components/modules/dashboard/panel/HomePagePanel';
import callApi from '@/app/services/callApi';
import { cookies } from 'next/headers';

export default async function Dashboard() {
  const cookie = await cookies();
  const cookieHeader = cookie.toString();
  const api = callApi({ cookieHeader });
  const res = await api.get('/capsules');
  const capsules = res.data;

  return <HomePagePanel capsules={capsules} />;
}
