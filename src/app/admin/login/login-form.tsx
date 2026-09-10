"use client";

import { useActionState } from "react";
import { loginAdmin } from "./actions";
import styles from "../admin.module.css";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, {});

  return (
    <form className={styles.loginForm} action={action}>
      <label htmlFor="password">관리자 비밀번호</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
      {state.message ? <p className={styles.error} role="alert">{state.message}</p> : null}
      <button type="submit" disabled={pending}>{pending ? "확인 중..." : "관리자 로그인"}</button>
    </form>
  );
}
