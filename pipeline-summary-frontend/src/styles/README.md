# Styles Organization

This folder contains all CSS files for the Pipeline Summary application.

## Structure

```
styles/
├── components/           # Component-specific CSS modules
│   ├── AppShell.module.css
│   ├── LoansGrid.module.css
│   ├── CustomizeColumns.module.css
│   ├── UserAssignModal.module.css
│   ├── LoanPipelineView.module.css
│   ├── StatusTabs.module.css
│   ├── PageTitle.module.css
│   └── ToastHost.module.css
├── App.css              # Global app styles and resets
├── index.css            # Tailwind imports and global styles
└── README.md            # This file
```

## Approach

This project uses a hybrid styling approach:

1. **Tailwind CSS Utilities**: Primary styling method using utility classes
2. **CSS Modules**: Component-specific styles for better organization and encapsulation
3. **Global Styles**: Base styles and resets in App.css and index.css

## CSS Modules

Each component has its own CSS module file that:
- Uses Tailwind's `@apply` directive to create reusable component classes
- Provides better organization and maintainability
- Ensures style encapsulation and prevents naming conflicts
- Makes components more readable by reducing long className strings

## Usage Example

```tsx
// Component file
import styles from '../styles/components/MyComponent.module.css';

export const MyComponent = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
    </div>
  );
};
```

```css
/* MyComponent.module.css */
.container {
  @apply flex flex-col space-y-4 p-6;
}

.title {
  @apply text-2xl font-bold text-gray-900;
}
```

## Benefits

- **Cleaner JSX**: Shorter, more semantic className attributes
- **Better Organization**: Styles are co-located with their components
- **Maintainability**: Easy to find and update component-specific styles
- **Type Safety**: CSS modules provide autocompletion and error checking
- **Performance**: CSS modules are optimized during build time