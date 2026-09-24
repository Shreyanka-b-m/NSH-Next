import { PROPERTIES_TAG } from '@/lib/cacheTags'
import { revalidateTagHooks } from './revalidateTag'

export const { afterChange: revalidateAfterChange, afterDelete: revalidateAfterDelete } =
  revalidateTagHooks(PROPERTIES_TAG)
