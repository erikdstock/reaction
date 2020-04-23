import { Grid, injectGlobalStyles, Theme, themeProps } from "@artsy/palette"
import * as Sentry from "@sentry/browser"
import { SystemContextProvider, track } from "Artsy"
import { SystemContextConsumer } from "Artsy/SystemContext"
import { RouteConfig } from "found"
import React, { useEffect } from "react"
import { HeadProvider } from "react-head"
import { Environment } from "relay-runtime"
import { data as sd } from "sharify"
import { Provider as StateProvider } from "unstated"
import { BreakpointVisualizer } from "Utils/BreakpointVisualizer"
import Events from "Utils/Events"
import { getENV } from "Utils/getENV"
import { ErrorBoundary } from "./ErrorBoundary"

import {
  MatchingMediaQueries,
  MediaContextProvider,
  ResponsiveProvider,
} from "Utils/Responsive"

export interface BootProps {
  children: React.ReactNode
  context: object
  headTags?: JSX.Element[]
  onlyMatchMediaQueries?: MatchingMediaQueries
  relayEnvironment: Environment
  routes: RouteConfig
  user: User
}

const { GlobalStyles } = injectGlobalStyles()

export const Boot = track(null, {
  dispatch: Events.postEvent,
})((props: BootProps) => {
  /**
   * Let our end-to-end tests know that the app is hydrated and ready to go; and
   * if in prod, initialize Sentry.
   */
  useEffect(() => {
    document.body.setAttribute("data-test", "AppReady") //

    if (getENV("NODE_ENV") === "production") {
      Sentry.init({ dsn: sd.SENTRY_PUBLIC_DSN })
    }
  }, [])

  const {
    children,
    context,
    headTags = [],
    onlyMatchMediaQueries,
    ...rest
  } = props

  const contextProps = {
    ...rest,
    ...context,
  }

  return (
    <Theme>
      <HeadProvider headTags={headTags}>
        <StateProvider>
          <SystemContextProvider {...contextProps}>
            <ErrorBoundary>
              <MediaContextProvider onlyMatch={onlyMatchMediaQueries}>
                <ResponsiveProvider
                  mediaQueries={themeProps.mediaQueries}
                  initialMatchingMediaQueries={onlyMatchMediaQueries as any}
                >
                  <SystemContextConsumer>
                    {({ appMaxWidth }) => {
                      return (
                        <Grid fluid maxWidth={appMaxWidth}>
                          <GlobalStyles />
                          {children}
                          {process.env.NODE_ENV === "development" && (
                            <BreakpointVisualizer />
                          )}
                        </Grid>
                      )
                    }}
                  </SystemContextConsumer>
                </ResponsiveProvider>
              </MediaContextProvider>
            </ErrorBoundary>
          </SystemContextProvider>
        </StateProvider>
      </HeadProvider>
    </Theme>
  )
})
