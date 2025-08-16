'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setMode, setData } from '@/app/store/editOrcreateSlice';
import CreateCapsulePage from './CreateCapsulePage';

export default function CapsulePageWrapper() {
  const params = useParams();
  const id = params?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {

      dispatch(setMode('edit'));

      fetch(`/api/capsules/${id}`)
        .then((res) => res.json())
        .then((data) => dispatch(setData(data)))
        .catch(() => dispatch(setData(null)));
    } else {
      dispatch(setMode('create'));
      dispatch(setData(null));
    }
  }, [id, dispatch]);

  return <CreateCapsulePage />;
}
