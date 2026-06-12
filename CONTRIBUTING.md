# Contributing to Payer

First off, thank you for considering contributing to Payer! It's people like you that make Payer such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, include as many details as possible:

- **Use a clear, descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed**
- **Explain which behavior you expected to see instead**
- **Include screenshots and animated GIFs if possible**
- **Include your environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear, descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and the proposed behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Follow the JavaScript/CSS styleguides (see below)
- Include appropriate test cases
- End all files with a newline
- Avoid platform-specific code

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - ⚡ `:zap:` when improving performance
  - 📝 `:memo:` when writing docs
  - 🐛 `:bug:` when fixing a bug
  - ✨ `:sparkles:` when introducing a new feature
  - 🔒 `:lock:` when dealing with security
  - ⬆️ `:arrow_up:` when upgrading dependencies
  - ⬇️ `:arrow_down:` when downgrading dependencies

### JavaScript Styleguide

- Use semicolons to end statements
- Use single quotes `''` for strings
- Use arrow functions `() => {}` for callbacks
- Use destructuring when possible
- Use `const` by default, `let` if reassignment is needed, avoid `var`

```javascript
// ❌ Don't
var name = "John"
function getData() { return data; }
const user = Object.assign({}, state, {name: "Jane"})

// ✅ Do
const name = 'John';
const getData = () => data;
const { ...state, name: 'Jane' } = user;
```

### CSS/Tailwind Styleguide

- Use Tailwind utility classes
- Avoid custom CSS when possible
- If custom CSS is needed, place it in a `module.css` file next to the component
- Use the `@layer` directive for custom styles
- Group related utilities together
- Use breakpoints consistently: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

```jsx
// ❌ Don't - inline styles
<div style={{ fontSize: '16px', color: 'red' }}>

// ✅ Do - Tailwind classes
<div className="text-base text-red-500">
```

### React Component Styleguide

```jsx
// ✅ Good component structure
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const MyComponent = ({ title, children, className }) => {
  const [state, setState] = React.useState(false);

  return (
    <div className={cn('p-4', className)}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
      <Button onClick={() => setState(!state)}>
        Toggle
      </Button>
    </div>
  );
};

export default MyComponent;
```

## Development Environment Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Make your changes
5. Run linter: `npm run lint`
6. Build: `npm run build`
7. Submit a pull request

## Testing

While writing features, ensure:

- Component renders without errors
- Props are handled correctly
- Responsive behavior works across breakpoints
- Accessibility is maintained
- RTL layout works properly

Manual testing checklist:
- [ ] Tested on desktop browser
- [ ] Tested on mobile/tablet
- [ ] Tested dark mode toggle
- [ ] Tested language switch (Arabic/English)
- [ ] Tested with different cities/locations
- [ ] Tested RTL layout
- [ ] Tested offline capability (if PWA related)

## Documentation

When adding features:

1. Update relevant documentation in `docs/`
2. Add JSDoc comments to functions
3. Update this CONTRIBUTING.md if needed
4. Add examples in code comments for complex logic

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority:high` - High priority
- `priority:low` - Low priority
- `wontfix` - This will not be worked on

## Community

- Join our discussions
- Follow our social media
- Subscribe to updates
- Share your experience with others

---

Thank you for contributing to Payer! 🙏

