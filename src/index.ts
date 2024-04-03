import * as React from 'react'

function useUpdateEffect(callback: React.EffectCallback, deps: React.DependencyList) {
  const isMount = React.useRef(false)
  React.useLayoutEffect(() => {
    if (!isMount.current) {
      isMount.current = true
      return
    }
    return callback()
  }, deps)
}

export interface FlipOptions {
  duration?: number
  easing?: string
  animateDimensions?: boolean
}
export function useFlip(deps: unknown[], options: FlipOptions = {}) {
  const { duration = 300, easing = 'ease', animateDimensions = false } = options

  const ref = React.useRef<HTMLElement | null>(null)
  const currentRectRef = React.useRef<DOMRect | null>(null)

  React.useLayoutEffect(() => {
    if (!ref.current) {
      console.warn('useFlip: ref is not defined, please check the ref of the element.')
      return
    }
    currentRectRef.current = ref.current.getBoundingClientRect()
  }, [])

  useUpdateEffect(() => {
    if (!ref.current) {
      return
    }

    const nextRect = ref.current.getBoundingClientRect()

    const deltaX = currentRectRef.current!.x - nextRect.x
    const deltaY = currentRectRef.current!.y - nextRect.y

    ref.current.animate(
      [
        {
          transform: `translate(${deltaX}px, ${deltaY}px)`,
          ...(animateDimensions ? { width: currentRectRef.current!.width } : {}),
        },
        { transform: 'translate(0, 0)', ...(animateDimensions ? { width: nextRect.width } : {}) },
      ],
      {
        duration,
        easing,
        fill: 'forwards',
      },
    )

    currentRectRef.current = nextRect
  }, deps)

  return ref as React.MutableRefObject<any>
}
