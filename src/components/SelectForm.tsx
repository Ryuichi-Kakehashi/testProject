import { MenuItem, Select, Typography } from "@mui/material";

export default function SelectForm(
  val: any,
  nameVal: any,
  change: any,
  item: any
) {
  // const now = new Date();

  return (
    <>
      <Select
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          border: 1,
          borderColor: "gray",
        }}
        value={val}
        onChange={change}
        name={nameVal}
      >
        {item.map((value: any) => {
          return (
            <MenuItem value={value} key={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
      {nameVal === "y" && (
        <Typography sx={{ mr: 2, ml: 1 }} variant="body1">
          年
        </Typography>
      )}
      {nameVal === "m" && (
        <Typography sx={{ mr: 2, ml: 1 }} variant="body1">
          月
        </Typography>
      )}
      {nameVal === "d" && (
        <Typography sx={{ mr: 2, ml: 1 }} variant="body1">
          日
        </Typography>
      )}
    </>
  );
}
