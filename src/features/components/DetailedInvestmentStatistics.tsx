import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export const DetailedInvestmentStatistics = () => {
  return (
    <>
      <Typography component="h1" variant="h5" textAlign="center" mb={3}>
        Detailed statistics
      </Typography>

      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="600">Name</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="600">Last price</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="600">Holdings</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                NEO
              </TableCell>
              <TableCell align="right">
                <Typography>$1.26</Typography>
              </TableCell>
              <TableCell align="right">
                <Box>
                  <Typography>$448</Typography>
                  <Typography>356 EOS</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
