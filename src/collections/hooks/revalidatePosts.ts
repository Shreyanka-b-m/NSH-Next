import { POSTS_TAG } from '@/lib/cacheTags'
import { revalidateTagHooks } from './revalidateTag'

export const { afterChange: revalidatePostsAfterChange, afterDelete: revalidatePostsAfterDelete } =
  revalidateTagHooks(POSTS_TAG)
