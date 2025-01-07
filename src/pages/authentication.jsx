import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/router";
import { useAuthentication } from "@/utils/authenticationProvider";

export default function Authentication() {
  const router = useRouter();

  const { setIsUserAuthenticated } = useAuthentication();
  //add somthing so when the user is in this page, the authentication button to not appear

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const saveUserToLocalStorage = (user) => {
    try {
      localStorage.setItem("user", JSON.stringify(user.email));
    } catch (err) {
      console.error("Error saving cities to local storage:", err);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const userExistsResponse = await fetch(
        `/api/users?email=${formData.email}`,
        {
          method: "GET",
        }
      );

      if (!userExistsResponse.ok) {
        throw new Error("Error checking user existence.");
      }

      const { exists } = await userExistsResponse.json();

      if (exists) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: errorData.error,
        }));
        return;
      }

      const data = await res.json();
      setIsUserAuthenticated(true);
      saveUserToLocalStorage(data.user);
      router.push("/home");
      console.log("User logged in successfully:", data);
      router;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "register",
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        throw new Error(`Registration failed: ${res.status}`);
      }

      const data = await res.json();
      console.log("User registered successfully:", data);

      await handleLogin();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: "800px",
          boxShadow: 3,
          backgroundColor: "#fff",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
              backgroundColor: "#bbdefb",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Authenticate
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: "center" }}>
              Explore and save favorite cities from all over the world!
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
            }}
          >
            <Box
              component="form"
              onSubmit={handleAuth}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                maxWidth: "300px",
              }}
            >
              <TextField
                label="Email"
                type="email"
                variant="filled"
                required
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                label="Password"
                type="password"
                variant="filled"
                required
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Begin"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
