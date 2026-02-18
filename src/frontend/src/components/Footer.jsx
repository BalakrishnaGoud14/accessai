// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Typography,
  Divider,
  Container,
  Link,
  Stack,
} from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        bgcolor: "grey.50",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Brand */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "primary.main",
                  borderRadius: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" color="white" fontWeight={700}>
                  AI
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight={600}>
                AccessAI
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Enterprise-grade access governance platform.
            </Typography>
          </Box>

          {/* Links */}
          <Box
            sx={{
              flex: 2,
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Stack spacing={1.5}>
              <Typography variant="subtitle2" fontWeight={600}>
                Product
              </Typography>
              <Link href="#" underline="hover">Features</Link>
              <Link href="#" underline="hover">Security</Link>
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2" fontWeight={600}>
                Company
              </Typography>
              <Link href="#" underline="hover">About</Link>
              <Link href="#" underline="hover">Careers</Link>
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2" fontWeight={600}>
                Legal
              </Typography>
              <Link href="#" underline="hover">Privacy</Link>
              <Link href="#" underline="hover">Terms</Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © 2026 AccessAI Platform. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
