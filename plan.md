# Obsidian Digital Content Strategy

## Overview
A comprehensive strategy to build interconnected digital spaces using Obsidian as the central knowledge management system, with specialized external sites for different content types.

## Content Architecture

### 🌱 Digital Garden (`garden.owlnai.com`)
**Purpose**: Living knowledge base with interconnected ideas
- **Tool Stack**: Obsidian → Quartz/ObsidianHTML → Static Site
- **Content Types**:
  - Evergreen notes
  - Concept maps
  - Learning paths
  - Book notes & insights
  - Technology deep-dives
- **Features**:
  - Bidirectional linking
  - Graph visualization
  - Organic content discovery
  - Version history of thoughts
- **Update Frequency**: Continuous (as ideas evolve)

### 📝 Blog (`blog.owlnai.com`)
**Purpose**: Polished, long-form content and tutorials
- **Tool Stack**: Obsidian → Hugo/Next.js → Static Site
- **Content Types**:
  - Technical tutorials
  - Project retrospectives
  - Industry thoughts
  - Tool reviews
  - Career insights
- **Features**:
  - SEO optimization
  - Comments/discussions
  - Newsletter integration
  - Code syntax highlighting
- **Update Frequency**: Weekly/bi-weekly

### ✈️ Travel Journal (`travels.owlnai.com`)
**Purpose**: Story-driven travel experiences and photography
- **Tool Stack**: Obsidian + Image plugins → Custom site
- **Content Types**:
  - Travel stories
  - Photo essays
  - Cultural observations
  - Location guides
  - Adventure logs
- **Features**:
  - Rich media integration
  - Map integration
  - Timeline views
  - Photo galleries
- **Update Frequency**: Per trip/experience

## Workflow Strategy

### 1. Content Creation Flow
```
Obsidian Vault (Central Hub)
├── 🌱 /garden/ → Auto-publish to Digital Garden
├── 📝 /blog-drafts/ → Manual publish to Blog
├── ✈️ /travel-logs/ → Manual publish to Travel Journal
└── 🔗 /cross-references/ → Link between all sites
```

### 2. Obsidian Setup
- **Daily Notes**: Capture fleeting thoughts
- **Templates**: Standardize content structure
- **Tags System**: `#garden`, `#blog`, `#travel`, `#draft`
- **Plugins**:
  - Templater (content templates)
  - Dataview (content queries)
  - Obsidian Git (version control)
  - Image handling plugins

### 3. Publishing Pipeline
- **Digital Garden**: Automated via GitHub Actions
- **Blog**: Manual curation + scheduled publishing
- **Travel**: Event-driven publishing

## Technical Implementation

### Digital Garden
- **Generator**: Quartz 4.0 or ObsidianHTML
- **Hosting**: Vercel/Netlify
- **Features**: Search, graph view, backlinks
- **Sync**: Real-time via Obsidian Git

### Blog
- **Framework**: Hugo/Next.js
- **CMS**: Obsidian → Markdown
- **Hosting**: Vercel
- **Features**: RSS, analytics, comments

### Travel Journal
- **Framework**: Astro/SvelteKit
- **Image Handling**: Cloudinary/Vercel
- **Maps**: Mapbox integration
- **Hosting**: Vercel

## Content Strategy

### Cross-Pollination
- Link garden concepts in blog posts
- Reference travel experiences in technical writing
- Create learning paths that span all sites
- Use consistent tagging across platforms

### Discovery Paths
- **From Main Site**: Clear navigation to specialized content
- **Between Sites**: Strategic cross-linking
- **Search**: Unified search across all properties
- **RSS**: Aggregate feeds for followers

## Maintenance & Evolution

### Monthly Reviews
- Analyze content performance across sites
- Identify orphaned content
- Update cross-references
- Refine categorization

### Quarterly Planning
- Content calendar for blog
- Travel documentation goals
- Garden growth areas
- Technical improvements

## Success Metrics

### Engagement
- Time spent on digital garden
- Blog post engagement rates
- Travel story shares
- Cross-site navigation patterns

### Growth
- Concept connections in garden
- Blog subscriber growth
- Travel story reach
- Knowledge base size

## Implementation Timeline

### Phase 1 (Month 1)
- Set up Obsidian vault structure
- Deploy basic digital garden
- Migrate existing content

### Phase 2 (Month 2)
- Launch blog with 5 initial posts
- Implement cross-linking strategy
- Set up analytics

### Phase 3 (Month 3)
- Deploy travel journal
- Establish publishing workflows
- Optimize for discovery

### Phase 4 (Ongoing)
- Content creation rhythm
- Continuous improvement
- Community building

## Tools & Resources

### Essential Tools
- **Obsidian** (core knowledge management)
- **GitHub** (version control & automation)
- **Vercel** (hosting & deployment)
- **Cloudinary** (image optimization)

### Optional Enhancements
- **Algolia** (advanced search)
- **Plausible** (privacy-focused analytics)
- **ConvertKit** (newsletter integration)
- **Figma** (design assets)

## Notes
- Start simple and evolve organically
- Focus on content quality over technical complexity
- Maintain consistent design language across sites
- Regular backups and version control
- Consider reader experience in navigation design

---

*This plan serves as a living document and should be updated as the strategy evolves.*
