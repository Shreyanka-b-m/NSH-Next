// Kept free of imports so collection hooks can use it without pulling in the Payload config.
export const PROPERTIES_TAG = 'properties'
export const FORMS_TAG = 'forms'
export const SETTINGS_TAG = 'site-settings'
export const PAGE_SEO_TAG = 'page-seo'
export const REDIRECTS_TAG = 'redirects'
export const POSTS_TAG = 'posts'
export const COMMENTS_TAG = 'comments'
// Approved comments of one post, so approving a comment refreshes only that post's page.
export const postCommentsTag = (postId: number | string) => `comments-post-${postId}`
