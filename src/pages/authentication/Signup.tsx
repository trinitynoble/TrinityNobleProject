import { useState, ChangeEvent, FormEvent } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconifyIcon from 'components/base/IconifyIcon';
import paths from 'routes/paths';

interface User {
  User_FirstName: string;
  User_LastName: string;
  User_Email: string;
  User_password: string;
}

const Signup = () => {
  const [user, setUser] = useState<User>({
    User_FirstName: '',
    User_LastName: '',
    User_Email: '',
    User_password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.User_FirstName || !user.User_LastName || !user.User_Email || !user.User_password) {
      setErrorMessage('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3000/budgetbuddy/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful signup (e.g., redirect user to the login page)
        alert(data.message);
        window.location.href = paths.signin; // Redirect to the sign-in page
      } else {
        setErrorMessage(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('There was an error during sign-up:', error);
      setErrorMessage('Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Typography align="center" variant="h4">
        Sign Up
      </Typography>
      <Typography mt={1.5} align="center" variant="body2">
        Let's Join us! Create an account with,
      </Typography>

      <Divider sx={{ my: 4 }}>or Signup with</Divider>

      {errorMessage && (
        <Typography color="error" variant="body2" align="center">
          {errorMessage}
        </Typography>
      )}

      <Stack component="form" mt={3} onSubmit={handleSubmit} direction="column" gap={2}>
        <TextField
          id="User_FirstName"
          name="User_FirstName"
          type="text"
          value={user.User_FirstName}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your First Name"
          autoComplete="given-name"
          fullWidth
          autoFocus
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:outline-person" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="User_LastName"
          name="User_LastName"
          type="text"
          value={user.User_LastName}
          onChange={handleInputChange}
          variant="filled"
          placeholder="Your Last Name"
          autoComplete="family-name"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="ic:outline-person" />
              </InputAdornment>
            ),
          }}
        />
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

        <Button
          type="submit"
          variant="contained"
          size="medium"
          fullWidth
          sx={{ mt: 1.5 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </Stack>

      <Typography mt={5} variant="body2" color="text.secondary" align="center" letterSpacing={0.25}>
        Already have an account? <Link href={paths.signin}>Sign In</Link>
      </Typography>
    </>
  );
};

export default Signup;
