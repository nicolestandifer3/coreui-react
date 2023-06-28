import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Highlight, Prism } from 'prism-react-renderer'

interface ScssDocsProps {
  file: string
  capture: string
}

const ScssDocs = ({ file, capture }: ScssDocsProps) => {
  ;(typeof global === 'undefined' ? window : global).Prism = Prism
  // eslint-disable-next-line unicorn/prefer-module
  require('prismjs/components/prism-scss')

  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { ext: { eq: ".scss" } }) {
        edges {
          node {
            name
            relativePath
            id
            internal {
              content
            }
          }
        }
      }
    }
  `)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _file = data.allFile.edges.find((node: any) => node.node.relativePath === file)
  const captureStart = `// scss-docs-start ${capture}`
  const captureEnd = `// scss-docs-end ${capture}`
  const re = new RegExp(`${captureStart}((?:.|\n)*)${captureEnd}`)
  const captured = re.exec(_file.node.internal.content)
  const code = captured ? captured[1].trim() : undefined

  if (code === undefined) {
    console.error(`Can't find "${capture}" in ${_file.node.relativePath}`)
  }

  return (
    code && (
      <div className="highlight">
        <Highlight
          code={code
            .replaceAll('--#{$prefix}', '--cui-')
            .replaceAll('\n  -', '\n-')
            .replaceAll('\n  @', '\n@')}
          language="scss"
          theme={{ plain: {}, styles: [] }}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style }}>
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i })
                return (
                  <div className={lineProps.className} key={i}>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token, key })
                      return (
                        <span className={tokenProps.className} key={key}>
                          {tokenProps.children}
                        </span>
                      )
                    })}
                  </div>
                )
              })}
            </pre>
          )}
        </Highlight>
      </div>
    )
  )
}

ScssDocs.displayName = 'ScssDocs'

export default ScssDocs
