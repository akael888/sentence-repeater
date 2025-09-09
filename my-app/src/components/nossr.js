import { useEffect, useState } from "react";

function NoSSR({ children, fallback = <div>Loading..</div> }) {
  const [hasMounted, setHadMounted] = useState(false);

  useEffect(() => {
    setHadMounted(true);
  }, []);


  if (!hasMounted) {
    return fallback;
  }

  return <>{children}</>
}

export default NoSSR;
