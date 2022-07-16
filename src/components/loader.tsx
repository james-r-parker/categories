import { Box, Grid, Skeleton } from "@mui/material"

const Loader: React.FC = () => {
    return (
        <Grid container direction="row" spacing={6} justifyContent="center" alignItems="center">
            <Grid item>
                <Box style={{ minWidth: 400 }}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={118} />
                </Box>
            </Grid>
            <Grid item>
                <Box style={{ minWidth: 400 }}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={118} />
                </Box>
            </Grid>
            <Grid item>
                <Box style={{ minWidth: 400 }}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" width={210} height={118} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Loader;