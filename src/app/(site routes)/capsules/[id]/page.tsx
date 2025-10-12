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
      metadataBase: new URL(process.env.PUBLIC_URL ?? 'http://localhost:3000'),
      title: `کپسول عمومی : ${capsule.title}` || 'کپسول عمومی',
      description: `توضیحات کپسول : ${capsule.description}` || 'توضیحات کپسول',
      icons: [{ url: capsule.image || '/images/def.jpg' }],
      openGraph: {
        url: `${process.env.PUBLIC_URL}/capsules/${capsuleId}` || `http://localhost:3000/capsules/${capsuleId}`,
        title: `کپسول عمومی : ${capsule.title}` || 'کپسول عمومی',
        description: `توضیحات کپسول : ${capsule.description}` || 'توضیحات کپسول',
        images: [
          {
            url: capsule.image || '/images/def.jpg',
            width: 512,
            height: 512,
            alt: 'کپسول عمومی',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'سایت کپسول',
        description: 'کپسول یه جور زمان‌نگهداره. خاطره‌هات رو با صدا، عکس یا نوشته می‌ذاری توش، زمان باز شدنش رو مشخص می‌کنی، و بعد... می‌مونه تا روزی که برگردی و دوباره بخونیش. برای خودت، برای یه عزیز، یا حتی واسه کسی که هنوز پیداش نکردی.',
        images: ['/images/Logo.png'],
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
