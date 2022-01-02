import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Stream } from "../lib/graphql/streams.graphql";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

interface Props {
  streams: Stream[];
}

export default function Posts(props: Props) {
  const styles = useStyles();
  const { streams } = props;

  return (
    <Grid container className={styles.container} spacing={4}>
      {streams.map((post) => (
        <Grid item key={post._id} xs={12} md={6}>
          <Link href={`/streams/${post._id}`}>
            <CardActionArea>
              <Card className={styles.card}>
                <div className={styles.cardDetails}>
                  <CardContent>
                    <Typography
                      component="h2"
                      variant="h5"
                      className={styles.cardText}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      noWrap={true}
                      variant="subtitle1"
                      color="textSecondary"
                      className={styles.cardText}
                    >
                      {post.url}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      paragraph
                      className={styles.cardText}
                    >
                      {post.description}
                    </Typography>
                  </CardContent>
                </div>
                <Box sx={{ display: { xs: "block", sm: "none" } }}>
                  <CardMedia
                    className={styles.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                </Box>
              </Card>
            </CardActionArea>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardText: {
    maxWidth: "26rem",
  },
  cardMedia: {
    width: 160,
  },
}));
