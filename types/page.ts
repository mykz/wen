export type Page = {
  id: string
  user_id: string
  slug: string | null
  name: string | null
  bio: string | null
  image_url: string | null
}

export type PageSocialLink = {
  id: string
  page_id: string
  type: string
  link: string
  sort_order: number
}
