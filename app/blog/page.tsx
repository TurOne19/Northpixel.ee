'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function BlogRedirect() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const post = searchParams.get('post')

  useEffect(() => {
    if (post) sessionStorage.setItem('openArticle', post)
    router.replace('/')
  }, [post, router])

  return null
}

export default function BlogPage() {
  return <Suspense><BlogRedirect /></Suspense>
}
