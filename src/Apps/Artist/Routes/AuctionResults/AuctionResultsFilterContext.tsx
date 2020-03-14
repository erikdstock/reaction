import React, { useContext, useReducer } from "react"

export interface AuctionResultsFilters {
  organizations?: string[]
  categories?: string[]
  sizes?: string[]
  page?: number
  sort?: string
  createdYearRange?: [string, string]
}

interface AuctionResultsFiltersState extends AuctionResultsFilters {
  reset?: boolean
}
/**
 * Initial filter state
 */
export const initialAuctionResultsFilterState: AuctionResultsFilters = {
  organizations: [],
  categories: [],
  sizes: [],
  page: 1,
  sort: "DATE_DESC",
}

export interface AuctionResultsFilterContextProps {
  filters?: AuctionResultsFilters
  onChange?: (filterState) => void
  resetFilters: () => void
  setFilter: (name: keyof AuctionResultsFilters, value: any) => void
  unsetFilter: (name: keyof AuctionResultsFilters) => void
  onFilterClick?: (
    key: keyof AuctionResultsFilters,
    value: string,
    filterState: AuctionResultsFilters
  ) => void
}

/**
 * Context behavior shared globally across the AuctionResultsFilter component tree
 */
export const AuctionResultsFilterContext = React.createContext<
  AuctionResultsFilterContextProps
>({
  filters: initialAuctionResultsFilterState,
  setFilter: null,
  resetFilters: null,
  unsetFilter: null,
})

export type SharedAuctionResultsFilterContextProps = Pick<
  AuctionResultsFilterContextProps,
  "filters" | "onFilterClick"
> & {
  onChange?: (filterState) => void
}

export const AuctionResultsFilterContextProvider: React.FC<SharedAuctionResultsFilterContextProps & {
  children: React.ReactNode
}> = ({ children, filters = {}, onFilterClick }) => {
  const initialFilterState = {
    ...initialAuctionResultsFilterState,
    ...filters,
  }

  const [auctionResultsFilterState, dispatch] = useReducer(
    AuctionResultsFilterReducer,
    initialFilterState
  )

  const auctionResultsFilterContext = {
    filters: auctionResultsFilterState,

    // Handlers
    onFilterClick,

    setFilter: (name, val) => {
      if (onFilterClick) {
        onFilterClick(name, val, { ...auctionResultsFilterState, [name]: val })
      }
      dispatch({
        type: "SET",
        payload: {
          name,
          value: val,
        },
      })
    },

    unsetFilter: name => {
      dispatch({
        type: "UNSET",
        payload: {
          name,
        },
      })
    },

    resetFilters: () => {
      dispatch({
        type: "RESET",
        payload: null,
      })
    },
  }

  return (
    <AuctionResultsFilterContext.Provider value={auctionResultsFilterContext}>
      {children}
    </AuctionResultsFilterContext.Provider>
  )
}

const AuctionResultsFilterReducer = (
  state: AuctionResultsFiltersState,
  action: {
    type: "SET" | "UNSET" | "RESET"
    payload: { name: keyof AuctionResultsFilters; value?: any }
  }
): AuctionResultsFiltersState => {
  const arrayFilterTypes: Array<keyof AuctionResultsFilters> = [
    "organizations",
    "categories",
    "sizes",
    "createdYearRange",
  ]

  switch (action.type) {
    /**
     * Setting  and updating filters
     */
    case "SET": {
      const { name, value } = action.payload

      const filterState: AuctionResultsFilters = {
        page: 1,
      }

      arrayFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as any] = value || []
        }
      })

      if (name === "createdYearRange") {
        const [earliestYear, latestYear] = filterState?.createdYearRange || []
        if (earliestYear && !latestYear) {
          filterState.createdYearRange = [earliestYear, earliestYear]
        } else if (!earliestYear && latestYear) {
          filterState.createdYearRange = [latestYear, latestYear]
        } else if (earliestYear && latestYear) {
          if (earliestYear > latestYear) {
            filterState.createdYearRange = [latestYear, earliestYear]
          }
        } else {
          filterState.createdYearRange = undefined
        }
      }

      // primitive filter types
      const primitiveFilterTypes: Array<keyof AuctionResultsFilters> = [
        "sort",
        "page",
      ]
      primitiveFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as any] = value
        }
      })

      delete state.reset

      return {
        ...state,
        ...filterState,
      }
    }

    /**
     * Unsetting a filter
     */
    case "UNSET": {
      const { name } = action.payload as { name: keyof AuctionResultsFilters }

      const filterState: AuctionResultsFilters = {
        page: 1,
      }

      const filters: Array<keyof AuctionResultsFilters> = ["sort"]
      filters.forEach(filter => {
        if (name === filter) {
          filterState[name as any] = null
        }
      })

      arrayFilterTypes.forEach(filter => {
        if (name === filter) {
          filterState[name as any] = []
        }
      })

      return {
        ...state,
        ...filterState,
      }
    }

    /**
     * Resetting filters back to their initial state
     */
    case "RESET": {
      return {
        ...initialAuctionResultsFilterState,
        reset: true,
      }
    }

    default:
      return state
  }
}

/**
 * Hook to conveniently access fiter state context
 */
export const useAuctionResultsFilterContext = () => {
  const artworkFilterContext = useContext(AuctionResultsFilterContext)
  return artworkFilterContext
}
