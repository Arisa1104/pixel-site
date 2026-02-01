import { getAllPosts } from "@/lib/posts";
import BlogIndexClient from "./blog-index-client";

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return <BlogIndexClient posts={posts} />;
}
