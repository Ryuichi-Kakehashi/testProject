import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  Modal,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectForm from "../components/SelectForm";
import ModalForm from "../components/ModalForm";
import axios from "axios";

const theme = createTheme({
  palette: {
    background: {
      default: "#99dfff",
    },
  },
});

const confirmPage = () => {
  //名前欄
  const name = useRef<HTMLInputElement>(null);
  //性別欄
  const defaultGender = ["男性", "女性", "その他"];
  const [gender, setGender] = useState(defaultGender[0]);

  //生年月日欄
  const now = new Date();
  const defaultYear = new Array(102)
    .fill(1)
    .map((_, i) => -i + now.getFullYear());
  const defaultMonth = new Array(12).fill(1).map((_, i) => i + 1);
  const [monthSt, setMonthSt] = useState(now.getMonth() + 1);
  const defaultDay = new Array(31).fill(1).map((_, i) => i + 1);
  const [daySt, setDaySt] = useState(31);
  if (now.getMonth() === 0) setDaySt(now.getDate());
  const [date, setdate] = useState({ y: now.getFullYear(), m: 1, d: 1 });
  //趣味欄
  const hobby = ["インドア", "アウトドア"];
  hobby.push("その他");
  const obj: any = {};
  hobby.map((v) => {
    return (obj[v] = false);
  });
  const [check, setCheck] = useState({ ...obj });
  const otherHobby = useRef<HTMLInputElement>(null);

  //備考欄
  const other = useRef<HTMLInputElement>(null);

  //エラー制御
  const [error, setError] = useState({ error: false, eMessage: "" });

  //モーダル制御
  const [modalOpen, setModalOpen] = useState(false);

  //取得データ
  const [result, setresult] = useState({
    name: "",
    gender: "",
    date: "",
    hobby: "",
    other: "",
  });

  const navigate = useNavigate();

  const changeName = () => {
    if (name.current) {
      name.current.validity.patternMismatch
        ? setError({ error: true, eMessage: "入力禁止文字が含まれています" })
        : setError({ error: false, eMessage: "" });
    }
  };

  const changeDate = (e: any) => {
    setdate(() => {
      const newobj = { ...date };
      // @ts-expect-error
      newobj[e.target.name] = parseInt(e.target.value);
      return newobj;
    });
    switch (e.target.name) {
      case "y":
        dateset(date["m"], e.target.value);
        if (date["m"] === 2 && e.target.value % 4 === 0) {
          setDaySt(29);
          if (date["d"] > 29) {
            setdate((prev) => {
              const newobj = { ...prev };
              newobj["d"] = 1;
              return newobj;
            });
          }
        }
        if (parseInt(e.target.value) === now.getFullYear()) {
          setMonthSt(now.getMonth() + 1);
          if (date["m"] > now.getMonth() + 1) {
            setdate((prev) => {
              const newobj = { ...prev };
              newobj["m"] = 1;
              if (date["d"] > 31) {
                newobj["d"] = 1;
              }
              return newobj;
            });
            setDaySt(31);
          }
        } else if (monthSt !== 12) {
          setMonthSt(12);
        }
        break;
      case "m":
        dateset(e.target.value, date["y"]);
        if (parseInt(e.target.value) === now.getMonth() + 1) {
          setDaySt(now.getDate());
          if (date["d"] > now.getDate()) {
            setdate((prev) => {
              const newobj = { ...prev };
              newobj["d"] = 1;
              return newobj;
            });
          }
        }
        break;
      case "d":
        break;
    }
  };

  const dateset = (setm: number, sety: number) => {
    switch (setm) {
      case 2:
        setDaySt(28);
        if (sety % 4 === 0) {
          setDaySt(29);
          if (date["d"] > 29) {
            setdate((prev) => {
              const newobj = { ...prev };
              newobj["d"] = 1;
              return newobj;
            });
          }
          break;
        }
        if (date["d"] > 28) {
          setdate((prev) => {
            const newobj = { ...prev };
            newobj["d"] = 1;
            return newobj;
          });
        }
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        setDaySt(30);
        if (date["d"] > 30) {
          setdate((prev) => {
            const newobj = { ...prev };
            newobj["d"] = 1;
            return newobj;
          });
        }
        break;
      default:
        if (daySt !== 31) {
          setDaySt(31);
        }
        break;
    }
  };

  const changeHobby = (e: any) => {
    setCheck(() => {
      const newobj = { ...check };

      newobj[e.target.value] = e.target.checked;
      return newobj;
    });
  };

  const confirm = () => {
    if (error["error"]) {
      console.log("confirm:エラー");
    }
    if (name.current && name.current.value !== "" && !error["error"]) {
      console.log("名前:" + name.current.value);
      setError({ error: false, eMessage: "" });
      console.log("性別:" + gender);
      console.log(date);
      const resultHobby: any[] = [];
      const newobj = { ...result };
      hobby.map((value) => {
        return (
          check[value] &&
          // @ts-expect-error
          console.log(value + ":" + check[value]) & resultHobby.push(value)
        );
      });
      newobj["hobby"] = "";
      resultHobby.map((value) => {
        newobj["hobby"] = newobj["hobby"] + value + "、";
      });
      check["その他"] &&
        // @ts-expect-error
        otherHobby.current.value !== undefined &&
        // @ts-expect-error
        otherHobby.current.value !== "" &&
        // @ts-expect-error
        console.log("その他趣味:" + otherHobby.current.value);

      newobj["hobby"] = newobj["hobby"].substring(
        0,
        newobj["hobby"].length - 1
      );
      if (
        check["その他"] &&
        otherHobby.current &&
        otherHobby.current.value !== undefined &&
        otherHobby.current.value !== ""
      )
        newobj["hobby"] =
          newobj["hobby"] + "(" + otherHobby.current.value + ")";
      other.current &&
        other.current.value !== "" &&
        console.log("備考:" + other.current.value);
      newobj["name"] = name.current.value;
      newobj["gender"] = gender;
      newobj["date"] = date["y"] + "年" + date["m"] + "月" + date["d"] + "日";
      newobj["other"] = other.current ? other.current.value : "";
      setresult({ ...newobj });
      setModalOpen(true);
      console.log("confirm:正常動作");
    } else if (!error["error"]) {
      setError({ error: true, eMessage: "必須項目です" });
      console.log("confirm:エラー");
    }
  };

  // const item = new Array(31).fill(1).map((_, i) => i + 1);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mt: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            error={error["error"]}
            required
            label="名前"
            color="primary"
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              border: 1,
              borderColor: "gray",
            }}
            inputRef={name}
            onChange={changeName}
            inputProps={{
              maxLength: 20,
              pattern: "^[a-zA-Zぁ-んァ-ヶ一-龠_ 　]+$",
            }}
          />
          {error["error"] && (
            <Typography sx={{ color: "red" }} variant="body2">
              {error["eMessage"]}
            </Typography>
          )}
        </Box>

        <Box>
          <RadioGroup
            row
            defaultValue={defaultGender[0]}
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            {defaultGender.map((value) => {
              return (
                <FormControlLabel
                  value={value}
                  control={<Radio value={value} />}
                  label={value}
                  key={value}
                />
              );
            })}
          </RadioGroup>
        </Box>

        <Typography variant="h6">誕生日</Typography>
        <Box
          sx={{
            mt: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {SelectForm(date["y"], "y", changeDate, defaultYear)}
          {SelectForm(
            date["m"],
            "m",
            changeDate,
            defaultMonth.slice(0, monthSt)
          )}
          {SelectForm(date["d"], "d", changeDate, defaultDay.slice(0, daySt))}
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">趣味</Typography>
          <FormGroup>
            {hobby.map((value) => (
              <FormControlLabel
                control={
                  <Checkbox size="small" onChange={changeHobby} value={value} />
                }
                label={value}
                key={value}
              />
            ))}
          </FormGroup>
          {check["その他"] === true && (
            <TextField
              color="primary"
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                border: 1,
                borderColor: "gray",
              }}
              inputProps={{ maxLength: 20 }}
              inputRef={otherHobby}
            />
          )}
        </Box>

        <TextField
          label="備考"
          color="primary"
          multiline
          sx={{
            mt: 2,
            bgcolor: "white",
            borderRadius: 1,
            border: 1,
            borderColor: "gray",
          }}
          inputRef={other}
          inputProps={{ maxLength: 140 }}
        />

        <Button
          sx={{ mt: 2, textTransform: "none" }}
          onClick={confirm}
          variant="contained"
        >
          confirm
        </Button>

        <Modal open={modalOpen} sx={{ overflowY: "scroll" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                mt: 10,
                bgcolor: "white",
                width: 400,
                boxShadow: 24,
                px: 4,
                pb: 4,
                pt: 3,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  height: 0,
                  textAlign: "right",
                }}
              >
                <IconButton onClick={() => setModalOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              {ModalForm(result)}
              <Button
                sx={{}}
                variant="contained"
                onClick={async () => {
                  try {
                    console.log(result);
                    await axios.post("http://localhost:3001/api/data", {
                      name: result.name,
                      gender: result.gender,
                      birthdate: result.date,
                      hobby: result.hobby,
                      other: result.other,
                    });
                    console.log("OK: 登録成功");
                    navigate("/");
                  } catch (error) {
                    console.error("登録失敗:", error);
                    alert("登録に失敗しました");
                  }
                }}
              >
                OK
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default confirmPage;
