import { createContext } from "react";

/**
 * The search context.
 * This allows the search bar to be scoped to any component, rather than a hard-coded
 * definition.
 * See https://react.dev/learn/passing-data-deeply-with-context
 * The steps to using it are:
 * 1. Create the context (this file)
 *      https://react.dev/learn/passing-data-deeply-with-context#step-1-create-the-context
 * 2. Use the context (Call useContext() in the consuming component, e.g. Dashboard.jsx)
 *      https://react.dev/learn/passing-data-deeply-with-context#step-2-use-the-context
 * 3. Provide the context in the parent component (Layout.jsx)
 *      https://react.dev/learn/passing-data-deeply-with-context#step-3-provide-the-context
 */
export const SearchContext = createContext();
