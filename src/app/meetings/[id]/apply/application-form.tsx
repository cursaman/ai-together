"use client";

import { useActionState } from "react";
import type { ApplicationState } from "./actions";
import styles from "./page.module.css";

type ApplicationFormProps = {
  action: (state: ApplicationState, formData: FormData) => Promise<ApplicationState>;
};

const initialState: ApplicationState = {};

export function ApplicationForm({ action }: ApplicationFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form className={styles.form} action={formAction} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">이름 <span>*</span></label>
        <input id="name" name="name" type="text" autoComplete="name" maxLength={40} required aria-invalid={Boolean(state.errors?.name)} aria-describedby={state.errors?.name ? "name-error" : undefined} placeholder="이름을 입력해주세요" />
        {state.errors?.name ? <p className={styles.error} id="name-error">{state.errors.name}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">이메일 <span>*</span></label>
        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} required aria-invalid={Boolean(state.errors?.email)} aria-describedby={state.errors?.email ? "email-error" : "email-help"} placeholder="hello@example.com" />
        <p className={styles.help} id="email-help">신청 결과를 안내받을 이메일이에요.</p>
        {state.errors?.email ? <p className={styles.error} id="email-error">{state.errors.email}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="phone">전화번호 <small>선택</small></label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} aria-invalid={Boolean(state.errors?.phone)} aria-describedby={state.errors?.phone ? "phone-error" : undefined} placeholder="010-0000-0000" />
        {state.errors?.phone ? <p className={styles.error} id="phone-error">{state.errors.phone}</p> : null}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">업종·만들고 싶은 홍보 자료 <small>선택</small></label>
        <textarea id="message" name="message" rows={5} maxLength={500} aria-invalid={Boolean(state.errors?.message)} aria-describedby={state.errors?.message ? "message-error" : "message-help"} placeholder="예: 동네 꽃집을 운영합니다. 가게 소개 블로그 글과 주문 문의가 가능한 홈페이지를 만들고 싶어요. AI 사용 경험도 알려주세요." />
        <p className={styles.help} id="message-help">가게 이름·업종, 필요한 작업, 기존 블로그·홈페이지 주소와 AI 사용 경험을 적어주세요. 비밀번호는 입력하지 마세요. 최대 500자</p>
        {state.errors?.message ? <p className={styles.error} id="message-error">{state.errors.message}</p> : null}
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">웹사이트</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.consent}>
        <input id="privacy" name="privacy" type="checkbox" required aria-invalid={Boolean(state.errors?.privacy)} aria-describedby={state.errors?.privacy ? "privacy-error" : "privacy-description"} />
        <label htmlFor="privacy"><strong>개인정보 수집 및 이용에 동의합니다. <span>*</span></strong><small id="privacy-description">신청 확인을 위해 이름, 이메일, 선택 입력한 전화번호를 수집하며 모임 운영 목적으로만 사용합니다.</small></label>
      </div>
      {state.errors?.privacy ? <p className={styles.error} id="privacy-error">{state.errors.privacy}</p> : null}

      {state.message ? <p className={styles.formMessage} role="alert">{state.message}</p> : null}
      <button className={styles.submit} type="submit" disabled={pending}>{pending ? "신청하고 있어요..." : "참가 신청하기"}</button>
    </form>
  );
}
