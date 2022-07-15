import { AppBar, Box, Chip, Container, Grid, Link, styled, Toolbar } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

const HeaderWrapper = styled('div')(({ theme }) => ({
    "& .xs-logo": {
        display: "inline-block"
    },
    "& .logo": {
        display: "none"
    },
    "& .xs-menu": {
        display: "block"
    },
    "& .menu": {
        display: "none"
    },
    [theme.breakpoints.up("lg")]: {
        "& .xs-logo": {
            display: "none"
        },
        "& .logo": {
            display: "inline-block"
        },
        "& .xs-menu": {
            display: "none"
        },
        "& .menu": {
            display: "block"
        },
    }
}));

function Header() {
    return (
        <HeaderWrapper>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <img className="logo" src="/logo.svg" alt="Parcel2Go.com" height={60} width={240} />
                        <img className="xs-logo" src="/logo_mobile.svg" alt="Parcel2Go.com" height={40} />
                        <Box style={{ flexGrow: 1 }} />
                        
                        <Box className='menu'>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item>
                                    <Link href="https://www.parcel2go.com/quick-quote">Get a quote</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://www.parcel2go.com/couriers">Services</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://www.parcel2go.com/tracking">Track a parcel</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://www.parcel2go.com/smartsend">Smart Send</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://www.parcel2go.com/smartsend/ebay">eBay Delivery</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://www.parcel2go.com/help-centre">Help</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://www.parcel2go.com/order/confirm">Basket</Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://www.parcel2go.com/login"><Chip icon={<FaceIcon />} label="Sign In" /></Link>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box className='xs-menu'>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item>
                                    <Link href="https://www.parcel2go.com/login"><Chip icon={<FaceIcon />} label="Sign In" /></Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </HeaderWrapper>
    )
}

export default Header
