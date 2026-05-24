# jjjjjjack-react-components

## CSS Customization

This library uses SCSS to define a complete theming system. At build time, SCSS variables are calculated and compiled into CSS custom properties (CSS variables) that you can override in your consumer project.

### How compilation works

The source file `src/vars.scss` uses:
- **SCSS variables** (`$bg-primary`, `$text-primary`, etc.) for base colors
- **`color.adjust()`** to derive related colors (e.g., lighter/darker variants)
- **`color.channel()`** to extract RGB values from colors
- **`@each` loops** to generate multiple CSS variables from maps

All calculations happen at build time and are compiled into static CSS custom properties.

### Compiled variables available

**Backgrounds** (6 variants with RGB):
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--bg-quaternary`, `--bg-quinary`, `--bg-active`
- `--bg-primary-rgb`, `--bg-secondary-rgb`, etc. (for `rgba()` use)

**Text**:
- `--text-primary`, `--text-secondary`, `--text-disabled`

**Borders**:
- `--border-primary`, `--border-primary-highlight`, `--border-secondary`, `--border-secondary-highlight`
- `--border-active` (dark theme only)

**Links**:
- `--link`, `--link-hover`

**Buttons** (3 variants with RGB):
- `--button-bg`, `--button-bg-secondary`, `--button-bg-tertiary`
- `--button-bg-rgb`, `--button-bg-secondary-rgb`, etc.

**Alerts**:
- `--error`, `--error-rgb`, `--warning`, `--warning-rgb`

**Other**:
- `--main-max-width`, `--textarea-resizer`, `--clickable-hover-backdrop-brightness`, `--clickable-active-backdrop-brightness`

### Override in your project

Add a CSS rule with your custom values. They will override the library defaults:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #111111;
  --link: #0077cc;
  --button-bg: #0055aa;
}

html.dark {
  --bg-primary: #121212;
  --text-primary: #f0f0f0;
  --link: #f7b500;
  --button-bg: #d48f00;
}
```

**Note**: Use `--*-rgb` variables for semi-transparent colors:
```css
/* Instead of */ background-color: var(--bg-primary);
/* Use this for transparency */ background-color: rgba(var(--bg-primary-rgb), 0.5);
```

### Light and dark themes

- `:root` selector sets light theme (default)
- `html.dark` selector sets dark theme (add `class="dark"` to `<html>`)
- All color calculations for each theme are pre-compiled
- Switch themes by toggling the `dark` class on your root element
