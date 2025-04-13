# progress-visualiser

A dashboard for visualising metrics and milestones indicative of progress towards some arbitrary goal

## TO-DO

-   Install Playwright
-   Add UI tests for home/metrics page
    -   Home
        -   CRD
    -   Metrics
        -   CRUD with edge cases
-   Implement MSAL
    -   Do not require login by default
    -   Default to guest with localStorage
    -   Have login option available
    -   Guard endpoints with App Roles
    -   Create admin link, which redirects to a guarded page, requiring an app role
-   Implement custom fetch hook for error handling
    -   how do we include this in client loader?
    -   make sure warmup notifications are not issued on error
-   Navigating via url should be possible (it's not, returns 404)
-   Implement record result
-   Update record result UI
-   Clean component code
-   Organise code (folder structure)
-   Functionality for date picker: filter with dates
-   Add authentication
-   Add metrics validation
-   Functionality for users?
