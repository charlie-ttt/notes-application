import * as React from "react";

import { gql, useMutation } from "@apollo/client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "../../src/Link";
import type { NextPage } from "next";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const CREATE_NOTE = gql`
  mutation createNote($text: String!) {
    insert_notes_one(object: { text: $text }) {
      id
      text
    }
  }
`;

const Create: NextPage = () => {
  const [text, setText] = React.useState<string>("");
  const [createNote] = useMutation(CREATE_NOTE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createNote({ variables: { text } });
    } catch (error) {
      alert("error creating note");
      console.log(error);
    }
    alert("Note created successfullly");
    setText("");
  };

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
          Create Note
        </Typography>
        <Link href="/">List Page</Link>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              required
              name="email"
              value={text}
              label="Notes"
              placeholder="Type here"
              multiline
              rows={6}
              variant="filled"
              onChange={(e) => setText(e.target.value)}
              inputProps={{ maxLength: 180 }}
            />
          </Box>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Create;
