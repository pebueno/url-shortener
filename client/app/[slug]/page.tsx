import { notFound, redirect } from 'next/navigation';

import { SlugPageProps } from '../../components/common/types';

export default async function SlugPage({ params }: SlugPageProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/urls/${params.slug}`,
    { cache: 'no-store' },
  );

  if (!res.ok) {
    return notFound();
  }

  const { target } = await res.json();

  redirect(target);
}
