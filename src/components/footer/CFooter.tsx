import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component. [docs]
   */
  className?: string
  /**
   * TODO: . [docs]
   */
  position?: 'fixed' | 'sticky'
}

export const CFooter = forwardRef<HTMLDivElement, CFooterProps>(
  ({ children, className, position, ...rest }, ref) => {
    const _className = classNames('footer', { [`footer-${position}`]: position }, className)

    return (
      <div className={_className} {...rest} ref={ref}>
        {children}
      </div>
    )
  },
)

CFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.oneOf(['fixed', 'sticky']),
}

CFooter.displayName = 'CFooter'
