import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: 'gray',
                color: 'white',
                padding: 2
            }}
        >
            <Typography>
                Лебедев Арсений Б9123-09.03.04 - 6 подгруппа
            </Typography>
        </Box>
    );
}

export default Footer;