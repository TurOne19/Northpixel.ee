import { redirect } from 'next/navigation'

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ post?: string }>
}) {
  const { post } = await searchParams
  if (post) {
    redirect(`/?article=${post}#blog`)
  }
  redirect('/#blog')
}