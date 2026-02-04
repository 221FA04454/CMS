# 🎨 FlexiSite Theme Engine
## Architecture Specification (v1.3)

**Status**: implementation_plan  
**Role**: Principal Frontend Architect  
**Objective**: Build a multi-tenant, token-based design system similar to Webflow Variable and EditorX Site Styles.

---

### 1. The Atomic Design Token Model
Design tokens are the "DNA" of the site. They are categorized into four levels of abstraction:

```typescript
interface ThemeTokens {
  colors: {
    brand: Record<string, string>; // primary, secondary, accent
    surface: Record<string, string>; // background, card, border
    content: Record<string, string>; // text-main, text-muted
  };
  typography: {
    fontFamily: string;
    headings: Record<'h1' | 'h2' | 'h3', { size: string; weight: number; color?: string }>;
    body: { size: string; weight: number; lineHeight: string };
  };
  scale: {
    spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;
    radius: Record<'sm' | 'md' | 'lg' | 'full', string>;
  };
  effects: {
    shadows: Record<'sm' | 'md' | 'lg', string>;
  };
}
```

### 2. The Hierarchy of Style (Resolution Algorithm)
The platform uses a "Waterfall" resolution model. When a component is rendered, its CSS is computed using this priority:

1.  **Node Responsive Override**: `node.style[activeViewport]` (Local high-priority).
2.  **Node Base Style**: `node.style.desktop` (Local mid-priority).
3.  **Component Default Design**: Defined in `registry.js` (System defaults).
4.  **Theme Tokens**: `theme.tokens` (Deepest layer).

**Computed Style Variable Mapping**:  
If a node uses a token (e.g., `backgroundColor: "var(--color-primary)"`), the renderer will resolve this variable against the active theme store.

### 3. Application Lifecycle & Performance
*   **CSS Variable Injection**: The active theme tokens are injected into the document root (`:root`) as CSS variables. This ensures that a single theme switch updates the entire site without a React re-render of every individual node.
*   **Undo/Redo Context**: Theme changes are tracked via `zundo` in the `themeStore` so users can undo "Accidental Brand Changes".

---

### 🚀 Implementation Workflow
1.  **Atomic Assets**: Create `src/store/themeStore.js`.
2.  **Variable Middleware**: Create a utility that syncs Zustand theme state to `:root` CSS variables.
3.  **UI Bridge**: Build the `ThemePanel.jsx` and integrate it into a new "Design" tab in the builder.
4.  **Logic Update**: Modify the styling inputs in `PropertiesPanel.jsx` to allow "Attaching" to a token instead of just entering hardcoded hex values.
