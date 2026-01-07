import { Metadata } from "next";
import Link from "next/link";
import { Button, VimeoEmbed } from "@/components/ui";
import { Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Video Library",
  description:
    "Watch bpmPro demos, tutorials, and customer success stories. See how window and door contractors use bpmPro to streamline their business.",
};

export default function VideoLibraryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-blue-50 to-background py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Video Library
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Watch demos, tutorials, and see <strong>bpmPro</strong> in action.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Customer Success Videos */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Customer Success Stories
            </h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {customerVideos.map((video, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-background overflow-hidden shadow-sm"
                >
                  <VimeoEmbed videoId={video.vimeoId} title={video.title} />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {video.name}, {video.company}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-orange-100 px-3 py-1 text-sm font-medium text-brand-orange-700">
                      {video.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Categories */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videoCategories.map((category, index) => (
              <div key={index}>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.videos.map((video, videoIndex) => (
                    <a
                      key={videoIndex}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg border border-border bg-background p-4 hover:border-brand-blue-200 hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-blue-100 text-brand-blue-600 group-hover:bg-brand-blue-600 group-hover:text-white transition-colors">
                          <Play className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground group-hover:text-brand-blue-600 transition-colors">
                            {video.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {video.duration}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* YouTube Channel CTA */}
          <div className="mt-12 rounded-xl bg-muted/50 p-8 text-center">
            <h2 className="text-xl font-bold text-foreground">
              Subscribe for More Videos
            </h2>
            <p className="mt-2 text-muted-foreground">
              Get the latest tutorials, tips, and product updates on our YouTube
              channel.
            </p>
            <a
              href="https://youtube.com/@xtriam/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4"
            >
              <Button variant="primary">
                Visit YouTube Channel
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Want a personalized demo?
              </h2>
              <p className="mt-2 text-brand-blue-100">
                Schedule a one-on-one session with our team to see how <strong>bpmPro</strong>
                fits your business.
              </p>
            </div>
            <Link href="/book-a-demo">
              <Button variant="accent" size="lg">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const customerVideos = [
  {
    vimeoId: "842923160",
    title: "Boost Staff Performance",
    name: "Mohammad Aljamal",
    company: "Hurricane Window and Screen",
    result: "80% less admin time",
  },
  {
    vimeoId: "843072856",
    title: "Streamline Operations",
    name: "Michele Diaz",
    company: "Palm Aluminum & Glass",
    result: "Streamlined operations",
  },
];

const videoCategories = [
  {
    title: "Product Demos",
    videos: [
      {
        title: "bpmPro Overview",
        duration: "5 min",
        url: "https://youtube.com/@xtriam/videos",
      },
      {
        title: "Sales Document Creation",
        duration: "8 min",
        url: "https://youtube.com/@xtriam/videos",
      },
      {
        title: "Projects Board Walkthrough",
        duration: "10 min",
        url: "https://youtube.com/@xtriam/videos",
      },
    ],
  },
  {
    title: "Tutorials",
    videos: [
      {
        title: "Getting Started with bpmPro",
        duration: "12 min",
        url: "https://youtube.com/@xtriam/videos",
      },
      {
        title: "Setting Up Your First Quote",
        duration: "7 min",
        url: "https://youtube.com/@xtriam/videos",
      },
      {
        title: "Managing Projects",
        duration: "9 min",
        url: "https://youtube.com/@xtriam/videos",
      },
    ],
  },
  {
    title: "Tips & Tricks",
    videos: [
      {
        title: "Keyboard Shortcuts",
        duration: "3 min",
        url: "https://youtube.com/@xtriam/videos",
      },
      {
        title: "Custom Reports",
        duration: "6 min",
        url: "https://youtube.com/@xtriam/videos",
      },
      {
        title: "Mobile App Features",
        duration: "5 min",
        url: "https://youtube.com/@xtriam/videos",
      },
    ],
  },
];
