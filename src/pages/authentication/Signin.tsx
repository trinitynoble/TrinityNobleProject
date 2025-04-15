import { useState, ChangeEvent, FormEvent } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';

interface User {
  User_Email: string;
  User_password: string;
}

const Signin = () => {
  const [user, setUser] = useState<User>({ User_Email: '', User_password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/budgetbuddy/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        console.log('User ID:', data.userId); // Log the user ID
        window.location.href = '/dashboard'; // Redirect to the dashboard
      } else {
        // Sign-in failed
        alert(data.error);
      }
    } catch (error) {
      console.error('There was an error during sign-in:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <>
      <Typography align="center" variant="h4">
        Sign In
      </Typography>
      <Typography mt={1.5} align="center" variant="body2">
        Welcome back!
      </Typography>

      <Divider sx={{ my: 4 }}>Please Sign In!</Divider>

      <Stack component="form" mt={3} onSubmit={handleSubmit} direction="column" gap={2}>
        <TextField
          id="User_Email"
          name="User_Email"
          type="email"
          value={user.User_Email}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Email"
          autoComplete="email"
          fullWidth
          autoFocus
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:baseline-alternate-email" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="User_password"
          name="User_password"
          type={showPassword ? 'text' : 'password'}
          value={user.User_password}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Password"
          autoComplete="current-password"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:outline-lock" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: user.User_password ? 1 : 0,
                  pointerEvents: user.User_password ? 'auto' : 'none',
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ border: 'none', bgcolor: 'transparent !important' }}
                  edge="end"
                >
                  <IconifyIcon
                    icon={showPassword ? 'ic:outline-visibility' : 'ic:outline-visibility-off'}
                    color="neutral.light"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack mt={-1.25} alignItems="center" justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox id="checkbox" name="checkbox" size="medium" color="primary" />}
            label="Remember me"
            sx={{ ml: -0.75 }}
          />
          <Link href="#!" fontSize="body2.fontSize">
            Forgot password?
          </Link>
        </Stack>

        <Button type="submit" variant="contained" size="medium" fullWidth>
          Sign In
        </Button>
      </Stack>

      <Typography mt={5} variant="body2" color="text.secondary" align="center" letterSpacing={0.25}>
        Don't have an account? <Link href={paths.signup}>Signup</Link>
      </Typography>
    </>
  );
};

export default Signin;
