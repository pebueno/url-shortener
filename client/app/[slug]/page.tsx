import { notFound, redirect } from 'next/navigation';

import { SlugPageProps } from '../../components/common/types';

export default async function SlugPage({ params: { slug } }: SlugPageProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${slug}`, {
    redirect: 'manual',
  });

  if (res.status === 404) {
    notFound();
  }

  if (![301, 302, 307, 308].includes(res.status)) {
    notFound();
  }

  const target = res.headers.get('location');
  if (!target) notFound();
  redirect(target);
}
