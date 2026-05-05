import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TopicDetailPage } from "@/app/components/topic-detail-page";
import {
  dashboardTopics,
  getAdjacentTopics,
  getDashboardTrack,
  getTopicsForTrack,
  getTopicForTrack,
  getTopicPreviewContent,
} from "@/lib/mock-data";

interface TopicPageProps {
  params: Promise<{
    topicSlug: string;
    trackSlug: string;
  }>;
}

export function generateStaticParams() {
  return dashboardTopics.map((topic) => ({
    topicSlug: topic.slug,
    trackSlug: topic.trackSlug,
  }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { topicSlug, trackSlug } = await params;
  const track = getDashboardTrack(trackSlug);
  const topic = getTopicForTrack(trackSlug, topicSlug);

  if (!track || !topic) {
    return {
      title: "Topic not found | AZ DSA Library",
    };
  }

  return {
    title: `${topic.title} | ${track.name}`,
    description: topic.description,
  };
}

export default async function TopicRoute({ params }: TopicPageProps) {
  const { topicSlug, trackSlug } = await params;
  const track = getDashboardTrack(trackSlug);
  const topic = getTopicForTrack(trackSlug, topicSlug);

  if (!track || !topic) {
    notFound();
  }

  const { nextTopic, previousTopic } = getAdjacentTopics(track.slug, topic.slug);

  return (
    <TopicDetailPage
      content={getTopicPreviewContent(topic)}
      nextTopic={nextTopic}
      previousTopic={previousTopic}
      topic={topic}
      topics={getTopicsForTrack(track.slug)}
      track={track}
    />
  );
}
