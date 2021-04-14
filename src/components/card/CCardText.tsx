import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface CCardTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * A string of all className you want applied to the component. [docs]
   */
  className?: string
  /**
   * Component used for the root node. Either a string to use a HTML element or a component. [docs]
   *
   * @default 'p'
   */
  component?: string | ElementType
}

export const CCardText = forwardRef<HTMLParagraphElement, CCardTextProps>(
  ({ children, component: Component = 'p', className, ...rest }, ref) => {
    const _className = classNames('card-text', className)

    return (
      <Component className={_className} {...rest} ref={ref}>
        {children}
      </Component>
    )
  },
)

CCardText.displayName = 'CCardText'
