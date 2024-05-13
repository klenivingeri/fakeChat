import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const BoxEditavel = () => {
    return (
        <Box sx={{
            display:'flex'
        }}>
        <TextField 
        sx={{ width:"100%"}}
        size="small"
        id="outlined-basic" label="Clique aqui para atualizar a frase..." variant="outlined" />
        <Button sx={{ marginLeft: '10px'}} size="small" variant="contained">Atualizar</Button>

        </Box>
    )
}

export default BoxEditavel