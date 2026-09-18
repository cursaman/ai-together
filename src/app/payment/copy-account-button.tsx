"use client";

import { useState } from "react";
import styles from "./page.module.css";

const accountNumber = "3333023341781";

export function CopyAccountButton() {
  const [copied, setCopied] = useState(false);

  async function copyAccount() {
    await navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button className={styles.copyButton} type="button" onClick={copyAccount}>
      {copied ? "복사 완료" : "계좌번호 복사"}
    </button>
  );
}
