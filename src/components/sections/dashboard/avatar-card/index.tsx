import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // <-- Import Button
import AvatarImg from 'assets/images/openai.png';

const profile = {
  title: 'Generate Financial Tips',
  location: 'New York, USA',
  avatar: AvatarImg
};

const AvatarCard = () => {
  return (
    <Paper sx={{ py: 4.75, height: 355 }}>
      <Stack direction="column" alignItems="center">
        <Avatar
          src={AvatarImg}
          sx={{
            height: 130,
            width: 130,
            bgcolor: 'info.main',
          }}
        />

<Typography variant="h4" color="text.primary" mt={2} align="center">
  {profile.title}
</Typography>

        <Stack mt={0.25} alignItems="center" spacing={0.5}>          
          <Button
            variant="outlined"
            size="small"
            sx={{ color: 'text.disabled', borderColor: 'text.disabled' }}
            onClick={() => alert('Button clicked!')}
          >
            {profile.location}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AvatarCard;
