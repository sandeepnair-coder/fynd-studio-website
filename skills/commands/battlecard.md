# /battlecard — Generate Battle Card

## Trigger
User runs `/battlecard <brand-url>` or asks to generate a battle card / competitive analysis.

## Steps
1. Scrape the brand URL for product, positioning, and market context
2. Research competitors in the same category
3. Generate the battle card comparing the brand vs competitors
4. Populate the battle card page with generated content
5. Refresh the browser to show the result

## Output Format
Populate battle card data in `public/battle-card.js`. All content must be:
- Comparison-focused (us vs them, strengths vs weaknesses)
- Data-backed where possible, qualitative where not
- Scannable with short bullet points
- Brand-specific and commercially useful

## Sections
1. Brand Overview — one-line positioning
2. Competitor Grid — 3-4 key competitors with positioning summaries
3. Strengths — what the brand does better (3-5 bullets)
4. Weaknesses — where competitors have the edge (3-5 bullets)
5. Opportunities — gaps the brand can exploit
6. Key Differentiators — what makes the brand unique
7. Recommended Actions — 3 strategic moves
