# Styles Organization

This folder contains all CSS files for the Pipeline Summary application.

## Structure

```
styles/
├── components/           # Component-specific CSS files
│   ├── AppShell.css
│   ├── LoansGrid.css
│   ├── CustomizeColumns.css
│   ├── UserAssignModal.css
│   ├── LoanPipelineView.css
│   ├── StatusTabs.css
│   ├── PageTitle.css
│   └── ToastHost.css
├── App.css              # Global app styles and resets
├── index.css            # Global styles
└── README.md            # This file
```

## Approach

This project uses regular CSS files with semantic class names for component-specific styling:

1. **Component CSS Files**: Each component has its own CSS file with descriptive class names
2. **Global Styles**: Base styles and CSS reset in index.css
3. **No CSS Frameworks**: Pure CSS without any utility frameworks like Tailwind
4. **Semantic Class Names**: Regular CSS classes for simplicity and maintainability

## Component Styles

Each component has its own CSS file that:
- Uses regular CSS properties instead of utility classes
- Provides better organization and maintainability
- Uses semantic, descriptive class names with component prefixes
- Makes components more readable and self-contained

## Usage Example

```tsx
// Component file
import '../styles/components/MyComponent.css';

export const MyComponent = () => {
  return (
    <div className="my-component-container">
      <h1 className="my-component-title">Title</h1>
    </div>
  );
};
```

```css
/* MyComponent.css */
.my-component-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
}

.my-component-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}
```

## Benefits

- **Pure CSS**: No utility framework dependencies
- **Better Organization**: Styles are co-located with their components
- **Maintainability**: Easy to find and update component-specific styles
- **Semantic Class Names**: Descriptive class names that explain their purpose
- **Standard CSS**: Works everywhere without build dependencies
- **Performance**: Smaller bundle size without unused utility classes