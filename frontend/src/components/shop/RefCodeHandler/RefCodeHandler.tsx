'use client';
import { handleQueryParamRef } from '@/typeorm/actions';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function RefCodeHandler() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');
  useEffect(() => {
    if (!!refCode && typeof refCode === 'string') {
      (async function () {
        await handleQueryParamRef(refCode);
      })();
    }
  }, [refCode]);
  return <></>;
}
