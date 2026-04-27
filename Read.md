Founder’s Runway: High-Fidelity Dashboard
"A precision-engineered financial instrument for startup founders."

The "Why"
Most founders view runway as a static number. I built this to transform financial data into a high-stakes, actionable countdown. By converting abstract months into a precise "Days to Zero" metric, the app provides instant psychological and operational clarity.

Key Features
Environmental UI State: The entire theme (background, text, and glows) dynamically shifts between Safe (Emerald), Warning (Amber), and Urgent (Red) based on the startup's health.

"What-If" Scenario Engine: A real-time simulator allowing founders to adjust burn rates by +/- 50% to see the immediate impact on their survival date.

Dual-Precision Countdown: Features a baseline "Days to Zero" counter alongside a dynamic "Scenario Days" counter, allowing for side-by-side comparison of strategic budget changes.

Localized Precision: Fully integrated with ₹ (Rupee) formatting and baseline calculations using a 30.44-day average month for financial accuracy.

Technical Stack
Framework: Next.js 14 

Styling: Tailwind CSS 

Language: TypeScript

Logic: Custom hooks for date math and percentage-based financial projections

Engineering Challenges
The Hydration Battle:
I initially experimented with localStorage for session persistence. This led to a classic React Hydration Error because the server-rendered HTML (SSG) didn't match the client-side state. I ultimately pivoted to a stateless, high-performance architecture to ensure a faster, more reliable user experience during live demos.

Semantic Color Mapping:
Rather than hardcoding colors, I implemented a theme-mapping logic. This ensures that the "Gain/Loss" text, "Scenario Date," and "Days to Zero" all inherit the same color, providing a cohesive visual experience.