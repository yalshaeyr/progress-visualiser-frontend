// there's an issue with react router v7 & jsdom
// jsdom does not implement TextEncoder yet and they will not fix it
// see https://github.com/remix-run/react-router/issues/12363
// solved by a helpful blog post - https://remarkablemark.org/blog/2025/02/02/fix-jest-errors-in-react-router-7-upgrade/
import { TextEncoder } from "util";

global.TextEncoder = TextEncoder;
