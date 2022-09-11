import * as React from "react";

import { gql, useQuery } from "@apollo/client";

import Box from "@mui/material/Box";
import Card from "../../src/components/Card";
import ClientOnly from "../../src/components/ClientOnly";
import Container from "@mui/material/Container";
import Link from "../../src/Link";
import type { NextPage } from "next";
import Typography from "@mui/material/Typography";

const PAGE_LIMIT = 20;

interface Notes {
  id: number;
  text: string;
}

interface APIResponse {
  notes: Notes[];
}

const QUERY = gql`
  query getNotes($limit: Int) {
    notes(limit: $limit) {
      id
      text
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, error } = useQuery<APIResponse>(QUERY, {
    variables: { limit: PAGE_LIMIT },
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

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
      </Box>
    </Container>
  );
};

export default Home;
