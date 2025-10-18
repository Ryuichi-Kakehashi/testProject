import { Box, Typography } from "@mui/material";

export default function ModalForm(item: any) {
  const items = (name: string, value: string) => {
    return (
      <Box
        sx={{
          display: "flex",
          width: 336,
          overflowWrap: "break-word",
        }}
      >
        <Typography sx={{ mb: 1, overflowWrap: "break-word" }} variant="body1">
          {name + ":"}
        </Typography>
        {value.length >= 15 && (
          <Typography
            sx={{ mb: 1, width: 299, overflowWrap: "break-word" }}
            variant="body1"
          >
            {value}
          </Typography>
        )}
        {value.length < 15 && (
          <Typography
            sx={{ mb: 1, overflowWrap: "break-word" }}
            variant="body1"
          >
            {value}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 5,
        width: 300,
      }}
    >
      {items("名前", item["name"])}
      {items("性別", item["gender"])}
      {items("誕生日", item["date"])}
      {item["hobby"] !== "" && items("趣味", item["hobby"])}
      {item["other"] !== "" && (
        <Box
          sx={{
            display: "flex",
            width: 336,
            overflowWrap: "break-word",
          }}
        >
          <Typography
            sx={{ mb: 1, width: 37, overflowWrap: "break-word" }}
            variant="body1"
          >
            備考:
          </Typography>
          <Typography
            sx={{ mb: 1, width: 299, overflowWrap: "break-word" }}
            variant="body1"
          >
            {item["other"]}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
