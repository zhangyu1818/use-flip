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
  dimensions?: 'width' | 'height' | true
  duration?: number
  easing?: string
  fill?: FillMode
}

export function useFlip(deps: unknown[], options: FlipOptions = {}) {
  const { duration = 300, easing = 'ease', fill = 'auto', dimensions } = options

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

    let from: Record<string, string> = {
      transform: `translate(${deltaX}px, ${deltaY}px)`,
    }

    let to: Record<string, string> = {
      transform: 'translate(0, 0)',
    }

    if (dimensions === true) {
      from = { ...from, width: `${currentRectRef.current!.width}px`, height: `${currentRectRef.current!.height}px` }
      to = { ...to, width: `${nextRect.width}px`, height: `${nextRect.height}px` }
    } else if (dimensions === 'width') {
      from = { ...from, width: `${currentRectRef.current!.width}px` }
      to = { ...to, width: `${nextRect.width}px` }
    } else if (dimensions === 'height') {
      from = { ...from, height: `${currentRectRef.current!.height}px` }
      to = { ...to, height: `${nextRect.height}px` }
    }

    ref.current.animate([from, to], {
      duration,
      easing,
      fill,
    })

    currentRectRef.current = nextRect
  }, deps)

  return ref as React.MutableRefObject<any>
}
