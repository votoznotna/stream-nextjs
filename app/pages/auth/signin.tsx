import { useState } from "react";
import { useAuth } from "lib/useAuth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, signIn } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    signIn(email, password);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <form onSubmit={onSubmit}>
          {error && <p>{error}</p>}
          <Typography variant="h4">Sign In</Typography>
          <Box pb={2.5} />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            label="Email"
            required
          />
          <Box pb={2.5} />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            label="Password"
            required
          />
          <Box pb={2.5} />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Container>
  );
}
