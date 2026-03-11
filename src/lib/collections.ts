import { getCollection } from 'astro:content'

export async function getBlogPosts() {
  const posts = await getCollection('blog')

  return posts.sort(
    (a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf(),
  )
}

export async function getFaqTopics() {
  const topics = await getCollection('faqTopics')

  return topics.sort((a, b) => a.data.order - b.data.order)
}
