import CapsuleNotFound from '@/app/components/modules/capeules/Capsule404';
import SinglePageCapsule from '@/app/components/modules/capeules/SinglePageCapsule';
import callApi from '@/app/services/callApi';
import { Capsule } from '@/lib/types';
import { AxiosError } from 'axios';
import { Metadata } from 'next';

type PageProps = {
  params?: Promise<{
    id?: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const param = await params;
  const capsuleId = param?.id;
  try {
    const res = await callApi().get(`/public/capsules/${capsuleId}`);
    const capsule = res.data.capsule as Capsule;

    return {
      title: `کپسول عمومی : ${capsule.title}` || 'کپسول عمومی',
      description: `توضیحات کپسول : ${capsule.description}` || 'توضیحات کپسول',
      openGraph: {
        title: `کپسول عمومی : ${capsule.title}` || 'کپسول عمومی',
        description: `توضیحات کپسول : ${capsule.description}` || 'توضیحات کپسول',
        images: [capsule.image || '/images/def.jpg'],
      },
    };
  } catch {
    return {
      title: 'کپسول پیدا نشد',
      description: 'کپسول مورد نظر پیدا نشد',
    };
  }
}

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
