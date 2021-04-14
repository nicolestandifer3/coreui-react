import React, { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface CNavbarTextProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * A string of all className you want applied to the base component. [docs]
   */
  className?: string
}

export const CNavbarText = forwardRef<HTMLSpanElement, CNavbarTextProps>(
  ({ children, className, ...rest }, ref) => {
    const _className = classNames('navbar-text', className)

    return (
      <span className={_className} {...rest} ref={ref}>
        {children}
      </span>
    )
  },
)

CNavbarText.displayName = 'CNavbarText'
