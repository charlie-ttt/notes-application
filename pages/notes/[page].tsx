import * as React from "react";

import { gql, useQuery } from "@apollo/client";

import Box from "@mui/material/Box";
import Card from "../../src/components/Card";
import ClientOnly from "../../src/components/ClientOnly";
import Container from "@mui/material/Container";
import Link from "../../src/Link";
import type { NextPage } from "next";
import Pagination from "../../src/components/Pagination";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const PAGE_LIMIT = 20;

interface Notes {
  id: number;
  text: string;
}

interface APIResponse {
  notes: Notes[];
}

const QUERY = gql`
  query getNotes($limit: Int, $offset: Int) {
    notes(limit: $limit, offset: $offset) {
      id
      text
    }
  }
`;

const Home: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const offset = (parseInt(page as string) - 1) * PAGE_LIMIT;
  const { data, loading, error } = useQuery<APIResponse>(QUERY, {
    variables: { offset, limit: PAGE_LIMIT },
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  if (isNaN(parseInt(page as string))) {
    return <>invalid path</>;
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Notes App
        </Typography>
        <Link href="/notes/create">Create Note</Link>
        <ClientOnly>
          <Box
            sx={{
              my: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data &&
              data.notes.map(({ id, text }) => <Card key={id} text={text} />)}
          </Box>
        </ClientOnly>
        <Pagination current={parseInt(page as string)} />
      </Box>
    </Container>
  );
};

export default Home;
