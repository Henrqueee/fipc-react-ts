Project Type: React + TypeScript Front-End  
Design System: Atomic Design (atoms → molecules → organisms → pages)

Language & Syntax:
- The entire project must be in English:
  - All labels, UI text, and messages.
  - All function and component names.
  - All comments and documentation (if present).
- Use TypeScript with strict typing.
- Functional components only, using React hooks.
- Props must be destructured and typed with interfaces suffixed by “Props”.
- Component names in PascalCase; functions in camelCase.

Architecture & Structure:
- Organize by scope: components, hooks, store, services, styles.
- Follow Atomic Design hierarchy for UI composition.
- Separate concerns clearly; avoid mixing logic and presentation.

Styling:
- Use CSS Modules and TailwindCSS.
- Prefer `display: flex` and `flex-direction: column`.
- Use scalable units (e.g., rem, em) and global CSS variables.
- Respect project-defined visual and color standards.

Imports:
- Maintain import order:  
  1. React  
  2. External libraries  
  3. Local modules  
  4. Styles

Development Discipline:
- Use existing hooks/utilities before creating new ones.
- Avoid dead code, premature abstractions, and redundant comments.
- Ensure semantic HTML and accessibility best practices.
- Implement loading states and error boundaries.
- Components must be testable in isolation.

Output Behavior:
- Agent must respond in English only, regardless of input language.
- Responses must be concise, focused, and strictly task-oriented.
- No suggestions, no Git commands, no conversational filler.
- Always apply deep reasoning to deliver the minimum viable solution.
- When code is generated, include a brief final report explaining:
  - What was built  
  - Why it was built that way  
  - Any assumptions or constraints

Compliance:
- Agent must not deviate from these rules.
- All outputs must reflect precision, clarity, and minimalism.