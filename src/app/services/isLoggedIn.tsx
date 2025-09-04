'use client';
import { useEffect } from 'react';
import { api } from './api';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '../store/userSlice';
import { usePathname } from 'next/navigation';

export default function IsLoggedInClient() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  async function hydrateUser() {
    try {
      const res = await api.getMe(); // { message, user } | null
      const user = res?.user ?? null;
      if (user) {
        dispatch(
          setUser({
            createdAt: user.createdAt ?? null,
            name: user.name ?? null,
            email: user.email ?? null,
            role: user.role ?? null,
            flag: user.flag ?? null,
            about: user.about ?? null,
            birthday: user.birthday ?? null,
            education: user.education ?? null,
            avatar: user.avatar ?? null,
            updatedAt: user.updatedAt ?? null,
            id: user._id ?? null,
          })
        );
      } else {
        dispatch(clearUser());
      }
    } catch {
      dispatch(clearUser());
    }
  }

  // بار اول
  useEffect(() => {
    let alive = true;
    (async () => {
      if (alive) await hydrateUser();
    })();
    return () => {
      alive = false;
    };
  }, [dispatch]);

  // هر بار مسیر عوض شد (Back/Forward هم شامل می‌شه)
  useEffect(() => {
    hydrateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // وقتی تب دوباره فوکِس شد، وضعیت رو تازه کن
  useEffect(() => {
    const onFocus = () => hydrateUser();
    window.addEventListener('visibilitychange', onFocus);
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('visibilitychange', onFocus);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  return null;
}
