import { useEffect } from "react";
import Posts from "components/Posts";
import { useStreamsQuery, Stream } from "lib/graphql/streams.graphql";
import { Box, Container, Typography } from "@mui/material";

export default function Streams() {
  const { data, loading, refetch } = useStreamsQuery({ errorPolicy: "ignore" });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4">Streams</Typography>
      </Box>
      {!loading && data && data.streams && (
        <Posts streams={data.streams as Stream[]} />
      )}
    </Container>
  );
}
