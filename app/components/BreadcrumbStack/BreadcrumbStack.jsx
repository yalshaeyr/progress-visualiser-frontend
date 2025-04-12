import Stack from "@mui/material/Stack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation } from "react-router";

const deriveBreadcrumbs = (pathName) => {
    // no need for processing in the base case
    if (pathName == "/") {
        return {
            breadcrumbs: ["Home"],
            links: ["/"],
        };
    }

    // we expect the format /parentPath/childPath1/childPath2
    let paths = pathName?.split("/");

    // remove the initial '/'
    paths?.shift();

    // transform /parentPath/childPath1/childPath2 into
    // /parentPath, /parentPath/childPath1 and /parentPath/childPath1/childPath2
    const links = paths?.map((_path, index) => {
        return (
            "/" +
            (index === 0 ? paths[0] : paths.slice(0, index + 1)?.join("/"))
        );
    });

    // capitalise the first letter of each path
    const breadcrumbs = paths?.map(
        (breadcrumb) =>
            breadcrumb?.charAt(0)?.toUpperCase() + breadcrumb?.slice(1)
    );

    // breadcrumbs: ParentPath, ChildPath1 & ChildPath2
    // links: /parentPath, /parentPath/childPath1, /parentPath/childPath1/childPath2
    return {
        breadcrumbs: breadcrumbs,
        links: links,
    };
};

export default function BreadcrumbStack() {
    const location = useLocation();
    const { breadcrumbs, links } = deriveBreadcrumbs(location.pathname);

    return (
        <Stack
            spacing={2}
            direction="row"
            data-testid="breadcrumb-stack"
        >
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link
                    style={{
                        "&:hover": {
                            textDecoration: "underline",
                        },
                        textDecoration: "none",
                        color: "inherit",
                    }}
                    to="/"
                >
                    Dashboard
                </Link>

                {breadcrumbs &&
                    breadcrumbs?.map((breadcrumb, index) => {
                        return (
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                                to={links[index]}
                                key={index}
                            >
                                {breadcrumb}
                            </Link>
                        );
                    })}
            </Breadcrumbs>
        </Stack>
    );
}
