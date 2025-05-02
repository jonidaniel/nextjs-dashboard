// Streaming is a data transfer technique that allows you to break down a route into smaller "chunks"
// and progressively stream them from the server to the client as they become ready

// There're two ways you can implement streaming in Next.js:
// 1. At the page level, with the loading.tsx file (which creates <Suspense> for you)
// 2. At the component level, with <Suspense> for more granular control

// A loading skeleton is a simplified version of the UI
// You can use them as a placeholder (or fallback) to indicate to users that the content is loading
// Any UI you add in loading.tsx will be embedded as part of the static file, and sent first
// Then, the rest of the dynamic content will be streamed from the server to the client
import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}
