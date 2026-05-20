import { redirect } from 'next/navigation'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ post?: string }>
}) {
  const params = await searchParams
  const post = params.post
  if (post) redirect(`/?article=${post}`)
  redirect('/')
}
