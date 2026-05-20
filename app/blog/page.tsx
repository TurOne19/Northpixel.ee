import { redirect } from 'next/navigation'

export default function BlogPage({
  searchParams,
}: {
  searchParams: { post?: string }
}) {
  const post = searchParams.post
  if (post) redirect(`/?article=${post}`)
  redirect('/')
}
