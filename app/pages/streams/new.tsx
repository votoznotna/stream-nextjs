import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCreateStreamMutation } from "lib/graphql/createStream.graphql";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function CreateStream() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();

  // Signing In
  const [createStream] = useCreateStreamMutation();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createStream({
        variables: { input: { title, description, url } },
      });
      if (data.addStream._id) {
        router.push("/streams");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">Create Stream</Typography>
        <form onSubmit={onSubmit}>
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Box pb={2.5} />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Box pb={2.5} />
          <TextField
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Box pb={2.5} />
          <Button type="submit" variant="contained" color="primary">
            Create Stream
          </Button>
        </form>
      </Box>
    </Container>
  );
}
