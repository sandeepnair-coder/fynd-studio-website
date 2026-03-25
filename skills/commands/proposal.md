# /proposal — Generate Campaign Proposal

## Trigger
User runs `/proposal <brand-url>` or asks to generate a campaign proposal.

## Steps
1. Scrape the brand URL for content, positioning, and visual identity
2. Analyze brand category, audience, tone, and content maturity
3. Generate all 10 sections of the campaign proposal using the structure defined in `CLAUDE.md`
4. Populate the proposal page at `/campaign-proposal` with the generated content
5. Refresh the browser to show the result

## Output Format
Populate `DUMMY_PROPOSAL_DATA` in `public/campaign-proposal.js` with brand-specific content. All text must be:
- Short and scannable (no walls of text)
- Written for a layman, not a strategist
- Specific to the brand (not reusable for another brand)

## Sections
1. Hero — brand name, sharp subheading, one-line opportunity, positioning line
2. Brand Snapshot — what, sells, audience, distinctive, vibe (each under 20 words)
3. Opportunity — 2-3 short sentences max
4. Key Insights — 3 insights, title + one-line explanation each
5. Transformation — from/to (fragments, not sentences) + one-line explanation
6. Campaign Platform — name, meaning, fit, scale (each under 25 words)
7. AI-Powered Solutions — 3 solutions with gap/approach/whyWins (each under 20 words)
8. Variants — 6 audience/regional variants (title + under 10 words each)
9. Impact — 3 metric statements (under 15 words each)
10. CTA — heading, one-line description, two button labels
