'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function BlogPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const post = searchParams.get('post')

  useEffect(() => {
    if (post) {
      // Store the slug so main page can pick it up
      sessionStorage.setItem('openArticle', post)
    }
    router.replace('/')
  }, [post, router])

  return null
}
