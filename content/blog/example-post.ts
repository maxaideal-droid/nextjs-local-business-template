import { BlogPost } from "@/types/blog";

const post: BlogPost = {
  slug: "example-post",
  title: "How to Get the Most Out of [Your Service] (An Honest Guide)",
  seoTitle: "How to Get the Most Out of [Your Service]",
  description:
    "A practical, no-fluff guide to [your service] — what to expect, how to prepare, and when it is not the right choice. Under 160 characters.",
  primaryKeyword: "your primary keyword here",
  secondaryKeywords: [
    "supporting keyword one",
    "supporting keyword two",
    "local keyword your city",
  ],
  publishedDate: "2026-01-15",
  heroImage: {
    src: "/blog/example-post/hero.jpg",
    alt: "Descriptive alt text for hero image containing primary keyword",
    width: 1200,
    height: 800,
    photographer: "Photographer Name",
    pexelsUrl: "https://www.pexels.com/photo/example/",
  },
  ogImage: {
    src: "/blog/example-post/hero.jpg",
    alt: "Descriptive alt text for social share image",
    width: 1200,
    height: 800,
  },
  intro: `
<p>The direct answer to the post's question goes here — in the first sentence. Readers and search engines both scan the opening, so lead with the answer and add context after.</p>
<p>This second paragraph adds necessary context, explains why the topic matters, and sets up the rest of the post. Keep it under four sentences.</p>
  `.trim(),
  tldr:
    "A one-sentence plain-text summary of the entire post. Appears in a callout box above the intro. Write this after you have finished the full post.",
  sections: [
    {
      id: "section-one",
      heading: "Section One Heading — Use a Supporting Keyword",
      content: `
<p>Body copy for section one. Short paragraphs. Active voice. Answer what the heading promised.</p>
<p>Link to an authoritative external source where relevant: <a href="https://example-authority.gov" target="_blank" rel="noopener noreferrer">Example Authority Source</a>.</p>
      `.trim(),
    },
    {
      id: "section-two",
      heading: "Section Two Heading",
      content: `
<p>Body copy for section two. Include an internal link to your booking page or a related service: <a href="/#booking">book an appointment</a>.</p>
      `.trim(),
    },
    {
      id: "when-not-to",
      heading: "When This Is Not the Right Choice",
      content: `
<p>This section is required. Tell the reader honestly when they should <em>not</em> hire you or book this service. This is the strongest trust signal in any local service content.</p>
<ul>
  <li><strong>Scenario one:</strong> Explain it plainly.</li>
  <li><strong>Scenario two:</strong> Explain it plainly.</li>
</ul>
      `.trim(),
    },
  ],
  faqs: [
    {
      question: "How long does [service] take?",
      answer:
        "Fill in with a direct, specific answer. Avoid ranges unless they are genuinely variable — readers want a number.",
    },
    {
      question: "How much does [service] cost?",
      answer:
        "Fill in the exact pricing from references/stats.md. Never round. Example: the standard session is $65, the package is $180 for three sessions.",
    },
    {
      question: "Do you serve [nearby city]?",
      answer:
        "Fill in your actual service area. Be specific about cities and distances.",
    },
    {
      question: "What should I do to prepare?",
      answer:
        "Step-by-step prep instructions. Numbered list if there are more than two steps.",
    },
  ],
};

export default post;
