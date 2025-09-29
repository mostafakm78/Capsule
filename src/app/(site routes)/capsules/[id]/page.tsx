import CapsuleNotFound from '@/app/components/modules/capeules/Capsule404';
import SinglePageCapsule from '@/app/components/modules/capeules/SinglePageCapsule';
import callApi from '@/app/services/callApi';
import { AxiosError } from 'axios';

type PageProps = {
  params?: Promise<{
    id?: string;
  }>;
};

export default async function CapsuleSlug({ params }: PageProps) {
  const param = await params;
  const capsuleId = param?.id;

  try {
    const res = await callApi().get(`/public/capsules/${capsuleId}`);

    if (res.status === 200) return <SinglePageCapsule capsule={res.data.capsule} />;
    else return <CapsuleNotFound />;
  } catch (error) {
    const err = error as AxiosError;
    if (err.status === 404) {
      return <CapsuleNotFound />;
    } else return <CapsuleNotFound />;
  }
}
