import Loader from "./loader/Loader";

const FetchComponent = ({
  children,
  useFetchStates,
  DataVisualisation,
  CustomErrorRenderer,
}) => {
  const { data, setData, isLoading, error, fetchDataAction } = useFetchStates;
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    if (CustomErrorRenderer) {
      return <CustomErrorRenderer />;
    }
    return "error";
  }
  if (data && DataVisualisation === null) {
    return null;
  }
  if (data && DataVisualisation !== undefined) {
    return DataVisualisation;
  }
  return children;
};

export default FetchComponent;
