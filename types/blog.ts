export interface BlogImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  photographer?: string;
  pexelsUrl?: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogSection {
  id: string;
  heading: string;
  content: string;
  image?: BlogImage;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Optional shorter title used only in the HTML <title> tag / meta. Falls back to title. */
  seoTitle?: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  publishedDate: string;   // ISO: "2026-01-15"
  updatedDate?: string;    // ISO — set when content is refreshed
  heroImage: BlogImage;
  ogImage: BlogImage;
  intro: string;           // HTML string — rendered with dangerouslySetInnerHTML
  tldr?: string;           // Plain text summary box shown above intro
  sections: BlogSection[];
  faqs: BlogFAQ[];
}
