"use client";

import { useActionState } from "react";
import type { StatusActionState } from "./actions";
import styles from "../../admin.module.css";

export function StatusForm({ action, currentStatus }: { action: (state: StatusActionState, formData: FormData) => Promise<StatusActionState>; currentStatus: string }) {
  const [state, formAction, pending] = useActionState(action, {});

  return <form className={styles.statusForm} action={formAction}>
    <div><select name="status" defaultValue={currentStatus} aria-label="신청 상태"><option>신청</option><option>확정</option><option>취소</option></select><button type="submit" disabled={pending}>{pending ? "변경 중" : "변경"}</button></div>
    {state.message ? <small className={state.success ? styles.success : styles.error} role="status">{state.message}</small> : null}
  </form>;
}
