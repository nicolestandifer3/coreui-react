import React, { ElementType, FC, HTMLAttributes, useContext } from 'react'
import classNames from 'classnames'
import { Popper, PopperChildrenProps } from 'react-popper'

import { Placements } from '../Types'
import { Alignments, CDropdownContext } from './CDropdown'

export interface CDropdownMenuProps
  extends HTMLAttributes<HTMLDivElement | HTMLUListElement>,
    Omit<
      PopperChildrenProps,
      'arrowProps' | 'forceUpdate' | 'placement' | 'ref' | 'style' | 'update'
    > {
  /**
   * A string of all className you want applied to the base component. [docs]
   */
  className?: string
  /**
   * Component used for the root node. Either a string to use a HTML element or a component. [docs]
   *
   * @default 'ul'
   */
  component?: string | ElementType
  // TODO: modifiers?: string[]
  // TODO: placement?: Placements
}

export const CDropdownMenu: FC<CDropdownMenuProps> = ({
  children,
  className,
  component: Component = 'ul',
  ...rest
}) => {
  const { alignment, dark, direction, placement, popper, visible } = useContext(CDropdownContext)

  let _placement: Placements = placement

  // _placement = placement

  // if (placement) {
  //   _placement = placement
  // }

  if (direction === 'dropup') {
    _placement = 'top-start'
  }
  if (direction === 'dropend') {
    _placement = 'right-start'
  }
  if (direction === 'dropstart') {
    _placement = 'left-start'
  }
  if (alignment === 'end') {
    _placement = 'bottom-end'
  }

  const alignmentClassNames = (alignment: Alignments) => {
    const classNames: string[] = []
    if (typeof alignment === 'object') {
      Object.keys(alignment).map((key) => {
        classNames.push(`dropdown-menu${key === 'xs' ? '' : `-${key}`}-${alignment[key]}`)
      })
    }

    if (typeof alignment === 'string') {
      classNames.push(`dropdown-menu-${alignment}`)
    }

    return classNames
  }

  const _className = classNames(
    'dropdown-menu',
    {
      'dropdown-menu-dark': dark,
      show: visible,
    },
    alignment && alignmentClassNames(alignment),
    className,
  )

  const dropdownMenuComponent = (style?: React.CSSProperties, ref?: React.Ref<any>) => {
    return (
      <Component
        className={_className}
        ref={ref}
        style={style}
        role="menu"
        aria-hidden={!visible}
        {...(!popper && { 'data-coreui-popper': 'static' })}
        {...rest}
      >
        {Component === 'ul'
          ? React.Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                return <li key={index}>{React.cloneElement(child)}</li>
              }
              return
            })
          : children}
      </Component>
    )
  }

  return (
    <>
      {visible &&
        (popper ? (
          <Popper placement={_placement}>
            {({ ref, style }) => dropdownMenuComponent(style, ref)}
          </Popper>
        ) : (
          dropdownMenuComponent()
        ))}
    </>
  )
}
