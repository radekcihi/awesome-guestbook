import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "../features/layout/Navbar";
import { Box, Container, Grid, ThemeProvider, createTheme, grid2Classes } from "@mui/material";
import { fakerEN as faker } from "@faker-js/faker";
import VisitorTable from "../features/VisitorView/Table";
import { UserProvider } from "../providers/UserContext";
import Table from "../features/VisitorView/Table";
import Form from "../features/AddVisitor/Form";

const inter = Inter({ subsets: ["latin"] });
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ef5742',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,

        },
      },
    },
  },

});



export default function Home() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <UserProvider>
        <Navbar />
        <Grid container component="main" height={{
          height: "100%",
        }} >
          <Grid xs={12} sm={12} md={5} lg={4} item={true}>
            <Container >
              <Form />
            </Container>
          </Grid>

          <Grid xs={12} sm={false} md={7} lg={8} item={true}>
            <Container maxWidth={false}>
              <Table />
            </Container>
          </Grid>
        </Grid>
      </UserProvider>
    </ThemeProvider >

  );
}
