'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { resetCapsule, setCapsule, setId, setMode } from '@/app/store/editOrcreateSlice';
import CreateCapsulePage from './CreateCapsulePage';
import CapsuleNotFound from './Capsule404';
import callApi from '@/app/services/callApi';
import { useAppDispatch } from '@/app/hooks/hook';
import { AxiosError } from 'axios';

export default function CapsulePageWrapper() {
  const params = useParams();
  const id = params?.id;
  const dispatch = useAppDispatch();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchCapsule() {
      if (!id) {
        dispatch(setMode('create'));
        dispatch(resetCapsule());
        if (mounted) setNotFound(false);
        return;
      }
      try {
        if (id) {
          const res = await callApi().get(`capsules/${id}`);
          if (!mounted) return;
          if (res.status === 200) {
            setNotFound(false);
            dispatch(setCapsule(res.data.capsule));
            dispatch(setMode('edit'));
            dispatch(setId(id[0]));
          }
        }
      } catch (e) {
        if (!mounted) return;
        const status = (e as AxiosError).response?.status ?? 0;

        if (status === 404 || status === 403) {
          setNotFound(true);
        } else {
          setNotFound(true);
        }
      }
    }
    fetchCapsule();
    return () => {
      mounted = false;
    };
  }, [id, dispatch]);

  if (notFound) {
    return <CapsuleNotFound />;
  }

  return <CreateCapsulePage />;
}
