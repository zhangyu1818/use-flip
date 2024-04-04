# use-flip

A zero-dependency React hook for executing FLIP (First, Last, Invert, Play) animations within your React applications. It offers a seamless and efficient method for animating changes in the positions and dimensions of elements.

## Installation

```bash
pnpm install use-flip
```

## Usage

Here's a basic example to get you started:

[![Edit use-flip](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/use-flip-hpmjxz)

```jsx
import React, { useState } from 'react'
import { useFlip } from 'use-flip'

function ExpandableComponent() {
  const [expanded, setExpanded] = useState(false)
  const flipRef = useFlip([expanded], {
    duration: 300,
    easing: 'ease-in-out',
    dimensions: 'height',
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

- `dimensions?: 'width' | 'height' | true` - Specifies whether to animate width and/or height. If set to `true`, both width and height are animated.
- `duration?: number` - The duration of the animation, in milliseconds. The default is `300`.
- `easing?: string` - The CSS easing function for the animation. The default is `'ease'`.
- `fill?: FillMode` - The fill mode of the animation, determining the styling of the element before and after the animation. The default is `'auto'`.

## Contributing

Contributions are always welcome!

## License

[MIT](LICENSE)
