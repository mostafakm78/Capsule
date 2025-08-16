'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setMode, setData } from '@/app/store/editOrcreateSlice';
import CreateCapsulePage from './CreateCapsulePage';
import CapsuleNotFound from './Capsule404';

export default function CapsulePageWrapper() {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(setMode('edit'));

      fetch(`/api/capsules/${id}`)
        .then((res) => {
          if (!res.ok) setNotFound(true);
          return res.json();
        })
        .then((data) => dispatch(setData(data)))
        .catch(() => setNotFound(true));
    } else {
      dispatch(setMode('create'));
      dispatch(setData(null));
    }
  }, [id, dispatch]);

  if (notFound) {
    return <CapsuleNotFound />;
  }

  return <CreateCapsulePage />;
}
