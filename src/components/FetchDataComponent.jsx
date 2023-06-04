import useFetchData from "../assets/custom-hooks/useFetchData";
import Loader from "./loader/Loader";

export default function FetchDataComponent({
  action,
  children,
  loaderSize = 1,
}) {
  const [data, isLoaded, error] = useFetchData(action);
  if (error) return <div>{error}</div>;
  if (!isLoaded) return <Loader size={loaderSize} />;
  if (!data) return null;
  console.log(data);
  return children(data);
}
