import * as React from "react";

import MUIPagination from "@mui/material/Pagination";
import { useRouter } from "next/router";

const FIXED_PAGES = 50; //mock pagination since dont have access to aggregate query

interface Props {
  current: number;
}

export default function Pagination({ current }: Props) {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/notes/${value}`);
  };
  return (
    <MUIPagination page={current} count={FIXED_PAGES} onChange={handleChange} />
  );
}
