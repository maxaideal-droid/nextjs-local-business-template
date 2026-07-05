# Author Bio

Used in BlogPostLayout.tsx for the author byline section and in the Article JSON-LD schema.

---

## Fields to fill in

```
Name: [Full name]
Job title: [Your actual title — e.g. Owner & Licensed [Trade], Certified [Credential]]
Years of experience: [X years]
Location: [City, ST]
Service area: [Primary areas served]
Credentials: [List any licenses, certifications, training]
```

---

## Short bio (used in blog posts — 2–3 sentences)

Replace the placeholder in `components/BlogPostLayout.tsx` with this text once filled in.

**Placeholder:** "[Author Name] is a [credential] based in [location] with [X] years of experience. [He/She/They] own[s] and operate[s] [Business Name], a [service type] serving [service area]."

---

## How to update the blog layout

Once you have written your real bio, update the author byline in two places:

1. `components/BlogPostLayout.tsx` — the visible author name and bio text
2. `app/blog/[slug]/page.tsx` — the `authors` array in `generateMetadata`

Both currently contain "Author Name" as a placeholder.
