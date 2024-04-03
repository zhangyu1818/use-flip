# use-flip

A React hook for performing FLIP (First, Last, Invert, Play) animations in your React applications, providing a smooth and efficient way to animate changes in element positions and dimensions.

## Installation

```bash
pnpm install use-flip
```

## Usage

Here's a basic example to get you started:

```jsx
import React, { useState } from 'react'
import { useFlip } from 'use-flip'

function ExpandableComponent() {
  const [expanded, setExpanded] = useState(false)
  const flipRef = useFlip([expanded], {
    duration: 300,
    easing: 'ease-in-out',
    animateDimensions: true,
  })

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>{expanded ? 'Collapse' : 'Expand'}</button>
      <div ref={flipRef} style={{ overflow: 'hidden', background: '#f0f0f0' }}>
        {expanded && (
          <p style={{ margin: 20 }}>
            More content here. When expanding or collapsing, this content will animate smoothly, demonstrating the FLIP
            animation.
          </p>
        )}
      </div>
    </div>
  )
}
```

## API

### `useFlip(deps, options)`

#### Parameters

- `deps: unknown[]` - An array of dependencies that will trigger the animation when changed.
- `options: FlipOptions` - An optional configuration object for the animation.

#### Options

- `duration?: number` - The duration of the animation in milliseconds. Default is `300`.
- `easing?: string` - The CSS easing function to use for the animation. Default is `'ease'`.
- `animateDimensions?: boolean` - Whether to include width and height changes in the animation. Default is `false`.

## Contributing

Contributions are always welcome!

## License

[MIT](LICENSE)
