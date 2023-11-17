import {
  isRouteErrorResponse,
  useRouteError,
  Navigate,
} from "react-router-dom";

function ErrorBoundary() {
  let error = useRouteError();
  console.log(error, "error");

  if (isRouteErrorResponse(error) && error.status === 401) {
    switch (error.data) {
      case 1:
        return <Navigate to="/supperAdmin" />;

      case 2:
        return <Navigate to="/admin" />;
      case 3:
        return <Navigate to="/driver" />;
      case 4:
        return <Navigate to="/resident" />;
      default:
        return <Navigate to="/login" />;
    }
  }

  if (
    isRouteErrorResponse(error) &&
    (error.status === 404 || error.status === 403)
  ) {
    return <Navigate to="/notFound" />;
  }

  return <Navigate to="/errorPage" />;
}

export default ErrorBoundary;
