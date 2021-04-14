import React, { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'

export type BPObject = {
  cols?: 'auto' | number
  gutter?: number
  gutterX?: number
  gutterY?: number
}

export interface CRowProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component. [docs]
   */
  className?: string
  /**
   * The number of columns/offset/order on extra small devices (<576px). [docs]
   *
   * @type {{ cols: 'auto' | number} | { gutter: number } | { gutterX: number } | { gutterY: number }}
   */
  xs?: 'auto' | number | boolean | BPObject
  /**
   * The number of columns/offset/order on small devices (<768px). [docs]
   *
   * @type {{ cols: 'auto' | number} | { gutter: number } | { gutterX: number } | { gutterY: number }}
   */
  sm?: 'auto' | number | boolean | BPObject
  /**
   * The number of columns/offset/order on medium devices (<992px). [docs]
   *
   * @type {{ cols: 'auto' | number} | { gutter: number } | { gutterX: number } | { gutterY: number }}
   */
  md?: 'auto' | number | boolean | BPObject
  /**
   * The number of columns/offset/order on large devices (<1200px). [docs]
   *
   * @type {{ cols: 'auto' | number} | { gutter: number } | { gutterX: number } | { gutterY: number }}
   */
  lg?: 'auto' | number | boolean | BPObject
  /**
   * The number of columns/offset/order on X-Large devices (<1400px). [docs]
   *
   * @type {{ cols: 'auto' | number} | { gutter: number } | { gutterX: number } | { gutterY: number }}
   */
  xl?: 'auto' | number | boolean | BPObject
  /**
   * The number of columns/offset/order on XX-Large devices (≥1400px). [docs]
   *
   * @type {{ cols: 'auto' | number} | { gutter: number } | { gutterX: number } | { gutterY: number }}
   */
  xxl?: 'auto' | number | boolean | BPObject
}

const BREAKPOINTS = [
  'xxl' as const,
  'xl' as const,
  'lg' as const,
  'md' as const,
  'sm' as const,
  'xs' as const,
]

export const CRow = forwardRef<HTMLDivElement, CRowProps>(
  ({ children, className, ...rest }, ref) => {
    const repsonsiveCLassNames: Array<string> = []

    BREAKPOINTS.forEach((bp) => {
      const breakpoint = rest[bp]
      delete rest[bp]

      const infix = bp === 'xs' ? '' : `-${bp}`

      if (typeof breakpoint === 'object') {
        if (breakpoint.cols) {
          repsonsiveCLassNames.push(`row-cols${infix}-${breakpoint.cols}`)
        }
        if (typeof breakpoint.gutter === 'number') {
          repsonsiveCLassNames.push(`g${infix}-${breakpoint.gutter}`)
        }
        if (typeof breakpoint.gutterX === 'number') {
          repsonsiveCLassNames.push(`gx${infix}-${breakpoint.gutterX}`)
        }
        if (typeof breakpoint.gutterY === 'number') {
          repsonsiveCLassNames.push(`gy${infix}-${breakpoint.gutterY}`)
        }
      }
    })

    const _className = classNames('row', repsonsiveCLassNames, className)

    return (
      <div className={_className} ref={ref}>
        {children}
      </div>
    )
  },
)

CRow.displayName = 'CRow'
