import axios from "axios";

import { Box, TextField, Button, Typography, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    background: {
      default: "#99dfff",
    },
  },
});

type User = {
  id: number;
  name: string;
  gender: string;
  birthdate: string;
  hobby: string;
  other: string;
};

const Home = () => {
  //名前欄
  const searchName = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<User[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get<User[]>("http://localhost:3001/api/data")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const navigate = useNavigate();

  const handleSearch = async () => {
    const keyword = searchName.current?.value || "";
    try {
      const res = await axios.get<User[]>(
        `http://localhost:3001/api/search?name=${encodeURIComponent(keyword)}`
      );
      setUsers(res.data);
    } catch (err) {
      console.error("検索エラー:", err);
      alert("検索に失敗しました");
    }
  };

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
            color="primary"
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              border: 1,
              borderColor: "gray",
            }}
            inputRef={searchName}
            inputProps={{
              maxLength: 20,
              pattern: "^[a-zA-Zぁ-んァ-ヶ一-龠_ 　]+$",
            }}
          />
          <Button
            variant="contained"
            sx={{ mt: 3, width: 120, bgcolor: "#0077b6" }}
            onClick={handleSearch}
          >
            検索
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ mt: 3, width: 120, bgcolor: "#0077b6" }}
          onClick={() => {
            navigate("/confirm");
          }}
        >
          登録へ
        </Button>
      </Box>
      <Box
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {users.map((user) => (
          <Box
            key={user.id}
            sx={{
              mt: 2,
              bgcolor: "white",
              p: 2,
              mb: 2,
              width: 400,
              borderRadius: 1,
              border: 1,
              borderColor: "gray",
            }}
          >
            <Typography>名前: {user.name}</Typography>
            <Typography>性別: {user.gender}</Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setSelectedUser(user);
                  setModalOpen(true);
                }}
              >
                詳細
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={async () => {
                  if (window.confirm("本当に削除しますか？")) {
                    console.log(user);
                    try {
                      await axios.delete(
                        `http://localhost:3001/api/data/${user.id}`
                      );
                      // 再読み込みして一覧を更新
                      const res = await axios.get<User[]>(
                        "http://localhost:3001/api/data"
                      );
                      setUsers(res.data);
                    } catch (err) {
                      console.error("削除エラー:", err);
                      alert("削除に失敗しました");
                    }
                  }
                }}
              >
                削除
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {selectedUser && (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
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

              <Typography variant="h6" gutterBottom>
                ユーザー詳細
              </Typography>
              <Typography>名前: {selectedUser.name}</Typography>
              <Typography>性別: {selectedUser.gender}</Typography>
              <Typography>誕生日: {selectedUser.birthdate}</Typography>
              <Typography>趣味: {selectedUser.hobby || "なし"}</Typography>
              <Typography>その他: {selectedUser.other || "なし"}</Typography>
              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button variant="contained" onClick={() => setModalOpen(false)}>
                  閉じる
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </ThemeProvider>
  );
};
export default Home;
