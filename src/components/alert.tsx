import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function AlertBanner({
  severity,
  detail,
}: {
  severity: "success" | "error";
  detail: string;
}) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={severity}>{detail}</Alert>
    </Stack>
  );
}
