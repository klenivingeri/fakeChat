'use client'
 
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid';
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../styles/themes/default'
import { GlobalStyle } from '../styles/global'
 
export default function StyledComponentsRegistry({ children }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())
 
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })
 
  if (typeof window !== 'undefined') return <>{children}</>
 
  return (
    <StyleSheetManager shouldForwardProp={isPropValid} sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={defaultTheme}>
        {children}
        <GlobalStyle />
      </ThemeProvider>
    </StyleSheetManager>
  )
}