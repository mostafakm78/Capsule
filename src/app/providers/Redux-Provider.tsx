'use client';
import { Provider } from 'react-redux';
import { makeStore, AppStore, RootState } from '@/app/store/store';
import { ReactNode, useMemo } from 'react';

export function ReduxProvider({ children }: { children: ReactNode; preloadedState?: Partial<RootState> }) {
  const store: AppStore = useMemo(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
}
