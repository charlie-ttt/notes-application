import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

// from https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/
export default function ClientOnly({ children, ...delegated }: Props) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}> {children} </div>;
}
