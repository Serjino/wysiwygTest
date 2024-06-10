import { RouteObject } from "react-router";

export function getFlattenedRoutes(routes: RouteObject[]): RouteObject[] {
    return routes.reduce((acc, route) => {
      if (route.children) {
        return [...acc, route, ...getFlattenedRoutes(route.children)];
      }
      return [...acc, route];
    }, []);
  }