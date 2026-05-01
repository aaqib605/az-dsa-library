import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackDetailPage } from "@/app/components/track-detail-page";
import {
  dashboardTracks,
  getDashboardTrack,
  getTopicsForTrack,
} from "@/lib/mock-data";

interface TrackPageProps {
  params: Promise<{
    trackSlug: string;
  }>;
}

export function generateStaticParams() {
  return dashboardTracks.map((track) => ({
    trackSlug: track.slug,
  }));
}

export async function generateMetadata({
  params,
}: TrackPageProps): Promise<Metadata> {
  const { trackSlug } = await params;
  const track = getDashboardTrack(trackSlug);

  if (!track) {
    return {
      title: "Track not found | AZ DSA Library",
    };
  }

  return {
    title: `${track.name} | AZ DSA Library`,
    description: track.description,
  };
}

export default async function TrackRoute({ params }: TrackPageProps) {
  const { trackSlug } = await params;
  const track = getDashboardTrack(trackSlug);

  if (!track) {
    notFound();
  }

  return <TrackDetailPage topics={getTopicsForTrack(track.slug)} track={track} />;
}
