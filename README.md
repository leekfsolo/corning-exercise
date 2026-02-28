# Corning Inclusion Table Exercise

## How to setup and run the project

### Installation

1. Clone the repository.
2. Navigate to the project directory:
   ```bash
   cd corning-exercise
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## 🛠️ Available Scripts

### Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

### Build

Compile the TypeScript code and bundle the application for production:

```bash
npm run build
```

### Testing

Run the unit test suite using Vitest:

```bash
npm test
```

## Tech stack

1. React + TypeScript + Vite
2. Tailwind CSS

## AI Assistant

I used Antigravity with Gemini 3 Flash and Claude Opus 4.6 to help me with this task.

## Assumptions or Trade-offs

1. Parent ID does not depend on the current table data, it is just a string value and can be edited.
2. Multiple selection is not supported.
3. Only one inclusion can be mutated at a time.

## What can be improved

### Enhancement before integration with backend

1. Add confirm modal when delete an item.
2. Add toast notification when an action is performed.
3. Add auto focus to the first input field when editing/adding an item.
4. Add keyboard actions such as Enter for saving.
5. Format radius value (currently display value uses dot while edit value uses comma).
6. Enhance UI for input components.

### Enhancement after integration with backend

1. Sorting server-side.
2. Loading state for async operations.

## Approximate time spent on the task

It took me around 5 hours to complete this task.
