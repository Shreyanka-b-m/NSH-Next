import { redirect } from 'next/navigation'

// There's no list of authors, so /blog/author/ goes to the blog instead of a 404.
// Temporary (307), so an authors page can be added here later without browsers remembering it.
export default function AuthorIndexPage() {
  redirect('/blog')
}
