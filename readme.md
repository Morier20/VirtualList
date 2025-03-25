# Virtual List with Radio Button State Persistence

This project demonstrates a virtual list implementation in JavaScript with the following features:

- **Virtualized Rendering**: Renders only the visible portion of the list based on the scroll position, improving performance with large data sets.
- **Radio Button State Persistence**: The state of radio buttons is stored in `localStorage`, so the user’s selections persist across page reloads.

## Features

- **Efficient List Rendering**: Only a small number of list items (up to 20) are rendered at a time. As the user scrolls, new items are dynamically loaded based on the scroll position.
- **Radio Button Tracking**: Each list item contains three radio buttons, and the selected state is saved locally using `localStorage`. The state persists even after page refreshes.
- **Dynamic Scrolling**: As the user scrolls the list container, the visible items are updated dynamically without rendering the entire list at once, ensuring performance for large lists.

## How It Works

1. **Virtual List**: The list is generated using JavaScript and HTML elements. Each item is styled to fit a specific height (`itemHeight`), and only the visible items are rendered.
2. **Scroll Event**: When the user scrolls the container (`.virtualListContainer`), the visible range of items is recalculated, and the list updates accordingly.
3. **State Persistence**: The radio button states are saved to `localStorage` with a unique key for each row index, allowing the state to persist even after the page reloads.

## Files

- `index.html`: The HTML structure for the virtual list and required containers.
- `style.css`: Styles for the virtual list and radio buttons.
- `script.js`: The JavaScript file implementing the virtual list, scroll handling, and radio button state persistence.

## Code Explanation

### HTML Structure

The HTML file should contain the following structure:

```html
<div class="virtualListContainer">
  <div class="virtualList"></div>
</div>
