/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactElement } from "react"
import { useStaticQuery, graphql } from "gatsby"

import "../styles/layout.scss"

import { ThemeProvider } from "@material-ui/core"
import { MyCustomTheme } from "../styles/myCustomTheme"

interface LayoutProps {
  children: ReactElement
}

const Layout = ({ children }: LayoutProps) => {
  return <ThemeProvider theme={MyCustomTheme}>{children}</ThemeProvider>
}

export default Layout
