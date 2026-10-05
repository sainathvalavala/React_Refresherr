import { lazy } from "react";

// The learning path, in order. App.jsx builds the sidebar from this list.
// Components are values, so they can be stored in an array like anything else.
//
// Code splitting (topic 31): lazy() loads each lesson's file only the first
// time it's opened, instead of bundling all 47 lessons into one big file.
// App.jsx wraps the lesson in <Suspense> to show a fallback while it loads.
export const sections = [
  { id: "core", label: "Core (100xdevs track)" },
  { id: "advanced", label: "Advanced" },
];

export const topics = [
  { number: 1, section: "core", title: "Starting a project", Component: lazy(() => import("./01-setup/SetupLesson")) },
  { number: 2, section: "core", title: "Components", Component: lazy(() => import("./02-components/ComponentsLesson")) },
  { number: 3, section: "core", title: "useState", Component: lazy(() => import("./03-useState/UseStateLesson")) },
  { number: 4, section: "core", title: "Tracking re-renders", Component: lazy(() => import("./04-re-renders/ReRendersLesson")) },
  { number: 5, section: "core", title: "useEffect", Component: lazy(() => import("./05-useEffect/UseEffectLesson")) },
  { number: 6, section: "core", title: "Props", Component: lazy(() => import("./06-props/PropsLesson")) },
  { number: 7, section: "core", title: "Conditional rendering", Component: lazy(() => import("./07-conditional-rendering/ConditionalLesson")) },
  { number: 8, section: "core", title: "children", Component: lazy(() => import("./08-children/ChildrenLesson")) },
  { number: 9, section: "core", title: "Lists and keys", Component: lazy(() => import("./09-lists-and-keys/ListsLesson")) },
  { number: 10, section: "core", title: "Inline styling", Component: lazy(() => import("./10-inline-styling/InlineStylingLesson")) },
  { number: 11, section: "core", title: "Class vs function", Component: lazy(() => import("./11-class-vs-function/ClassVsFunctionLesson")) },
  { number: 12, section: "core", title: "Lifecycle events", Component: lazy(() => import("./12-lifecycle-events/LifecycleLesson")) },
  { number: 13, section: "core", title: "Error boundary", Component: lazy(() => import("./13-error-boundary/ErrorBoundaryLesson")) },
  { number: 14, section: "core", title: "Fragment", Component: lazy(() => import("./14-fragment/FragmentLesson")) },
  { number: 15, section: "core", title: "SPAs and routing", Component: lazy(() => import("./15-routing/RoutingLesson")) },
  { number: 16, section: "core", title: "Layouts", Component: lazy(() => import("./16-layouts/LayoutsLesson")) },
  { number: 17, section: "core", title: "Building a website", Component: lazy(() => import("./17-website/WebsiteLesson")) },
  { number: 18, section: "core", title: "useRef", Component: lazy(() => import("./18-useRef/UseRefLesson")) },
  { number: 19, section: "core", title: "Custom hooks", Component: lazy(() => import("./19-custom-hooks/CustomHooksLesson")) },
  { number: 20, section: "core", title: "Rolling up state", Component: lazy(() => import("./20-rolling-up-state/RollingUpStateLesson")) },
  { number: 21, section: "core", title: "Prop drilling", Component: lazy(() => import("./21-prop-drilling/PropDrillingLesson")) },
  { number: 22, section: "core", title: "Context API", Component: lazy(() => import("./22-context-api/ContextLesson")) },
  { number: 23, section: "core", title: "Testing context", Component: lazy(() => import("./23-testing-context/TestingContextLesson")) },
  { number: 24, section: "core", title: "Recoil (Jotai)", Component: lazy(() => import("./24-recoil-jotai/RecoilLesson")) },

  { number: 25, section: "advanced", title: "PropTypes in depth", Component: lazy(() => import("./25-proptypes/PropTypesLesson")) },
  { number: 26, section: "advanced", title: "TypeScript with React", Component: lazy(() => import("./26-typescript/TypeScriptLesson")) },
  { number: 27, section: "advanced", title: "Forms", Component: lazy(() => import("./27-forms/FormsLesson")) },
  { number: 28, section: "advanced", title: "Form actions (React 19)", Component: lazy(() => import("./28-form-actions/FormActionsLesson")) },
  { number: 29, section: "advanced", title: "useReducer", Component: lazy(() => import("./29-useReducer/UseReducerLesson")) },
  { number: 30, section: "advanced", title: "useMemo and useCallback", Component: lazy(() => import("./30-useMemo-useCallback/MemoLesson")) },
  { number: 31, section: "advanced", title: "lazy and Suspense", Component: lazy(() => import("./31-lazy-suspense/LazyLesson")) },
  { number: 32, section: "advanced", title: "Portals", Component: lazy(() => import("./32-portals/PortalsLesson")) },
  { number: 33, section: "advanced", title: "Transitions", Component: lazy(() => import("./33-transitions/TransitionsLesson")) },
  { number: 34, section: "advanced", title: "More hooks", Component: lazy(() => import("./34-more-hooks/MoreHooksLesson")) },
  { number: 35, section: "advanced", title: "Keys and identity", Component: lazy(() => import("./35-keys-identity/KeysIdentityLesson")) },
  { number: 36, section: "advanced", title: "Data fetching patterns", Component: lazy(() => import("./36-data-fetching/DataFetchingLesson")) },
  { number: 37, section: "advanced", title: "TanStack Query", Component: lazy(() => import("./37-tanstack-query/TanStackQueryLesson")) },
  { number: 38, section: "advanced", title: "Advanced routing", Component: lazy(() => import("./38-advanced-routing/AdvancedRoutingLesson")) },
  { number: 39, section: "advanced", title: "Zustand", Component: lazy(() => import("./39-zustand/ZustandLesson")) },
  { number: 40, section: "advanced", title: "Redux Toolkit", Component: lazy(() => import("./40-redux-toolkit/ReduxLesson")) },
  { number: 41, section: "advanced", title: "Testing, deeper", Component: lazy(() => import("./41-testing-deeper/TestingDeeperLesson")) },
  { number: 42, section: "advanced", title: "Component patterns", Component: lazy(() => import("./42-component-patterns/PatternsLesson")) },
  { number: 43, section: "advanced", title: "Styling and UI libraries", Component: lazy(() => import("./43-styling-libraries/StylingLesson")) },
  { number: 44, section: "advanced", title: "Accessibility", Component: lazy(() => import("./44-accessibility/AccessibilityLesson")) },
  { number: 45, section: "advanced", title: "Performance profiling", Component: lazy(() => import("./45-performance/PerformanceLesson")) },
  { number: 46, section: "advanced", title: "Env vars and deployment", Component: lazy(() => import("./46-env-deployment/DeploymentLesson")) },
  { number: 47, section: "advanced", title: "Next.js and Server Components", Component: lazy(() => import("./47-nextjs/NextJsLesson")) },
];
