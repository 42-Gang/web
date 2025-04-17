import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectHighlight from "../../../assets/image/SelectHighlight.svg";
import InputField from "./InputField";
import useLogin from "./useLogin";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase";

interface ActionButtonProps {
  setError: (message: string) => void;
}

const MOCK_CODE = "mock-code";

const ActionButton = ({ setError }: ActionButtonProps) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<
    "default" | "signInOptions" | "signUpOptions" | "signInWithEmail"
  >("default");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin(setError);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await fetch(
        `http://localhost:3001/users?email=${user.email}`
      );
      const existingUsers = await res.json();

      if (existingUsers.length > 0) {
        alert("🔐 기존 유저로 로그인되었습니다!");
        navigate("/Home");
      } else {
        await fetch("http://localhost:3001/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            nickname: user.displayName || "no_nickname",
            password: user.uid,
            mailVerificationCode: MOCK_CODE,
          }),
        });
        alert("🎉 새 유저로 회원가입 완료!");
        navigate("/Home");
      }
    } catch (error) {
      console.error("❌ 구글 로그인 에러:", error);
      setError("Google 로그인에 실패했어요!");
    }
  };

  const buttonClass =
    "cursor-pointer flex gap-[10px] -ml-[40px] group justify-center items-center";
  const imgClass =
    "opacity-0 group-hover:opacity-100 transition-opacity duration-500";
  const textClass = "text-white font-['QuinqueFive'] text-[15px]";

  const handleButtonClick = (action: "signIn" | "signUp") => {
    if (action === "signIn") {
      setMode("signInOptions");
    } else {
      setMode("signUpOptions");
    }
  };

  const handleSignInWithEmail = () => {
    login(email, password);
  };

  const handleEmailClick = () => {
    if (mode === "signInOptions") {
      setMode("signInWithEmail");
    } else {
      navigate("/RegisterWithEmail");
    }
  };

  const renderOptions = () => (
    <div className="flex flex-col items-center gap-[12px] mt-[-25px]">
      <button className={buttonClass} onClick={handleGoogleLogin}>
        <img src={SelectHighlight} alt="highlight" className={imgClass} />
        <span className={textClass}>CONTINUE WITH GOOGLE</span>
      </button>

      <button className={buttonClass} onClick={handleEmailClick}>
        <img src={SelectHighlight} alt="highlight" className={imgClass} />
        <span className={textClass}>CONTINUE WITH EMAIL</span>
      </button>

      <button className={buttonClass} onClick={() => setMode("default")}>
        <img src={SelectHighlight} alt="highlight" className={imgClass} />
        <span className={textClass}>GO BACK</span>
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {mode === "default" && (
        <>
          {["signIn", "signUp"].map((action) => (
            <button
              key={action}
              onClick={() => handleButtonClick(action as "signIn" | "signUp")}
              className={buttonClass}
            >
              <img
                src={SelectHighlight}
                alt="SelectHighlight"
                className={imgClass}
              />
              <span className={textClass}>
                {action === "signIn" ? "SIGN IN" : "SIGN UP"}
              </span>
            </button>
          ))}
        </>
      )}

      {(mode === "signInOptions" || mode === "signUpOptions") &&
        renderOptions()}

      {mode === "signInWithEmail" && (
        <div className="flex flex-col items-center justify-center space-y-[26px] absolute -top-[30px]">
          <InputField
            label="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            width="250px"
          />
          <InputField
            label="PW"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            width="250px"
          />
          <div className="space-y-4">
            <button className={buttonClass} onClick={handleSignInWithEmail}>
              <img src={SelectHighlight} alt="highlight" className={imgClass} />
              <span className={textClass}>CONFIRM</span>
            </button>
            <button
              className={buttonClass}
              onClick={() => setMode("signInOptions")}
            >
              <img src={SelectHighlight} alt="highlight" className={imgClass} />
              <span className={textClass}>GO BACK</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButton;
