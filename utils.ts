import type { FirebaseApp } from "firebase/app"
import type {Auth as FirebaseAuth} from "firebase/auth"

import { getApps, initializeApp} from "firebase/app";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";

/**
 * @description Firebaseの管理画面から取得したAPIオブジェクト
 * @note 環境変数は`.env.local`ファイルに定義しています
 */
export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * @description FirebaseAppを返す
 */

export const getFirebaseApp = (): FirebaseApp | undefined => {
    if (typeof window === "undefined") return;

    return getApps()[0] || initializeApp(firebaseConfig)
};

/**
 * @description FirebaseAuthを返す
 */
export const getFirebaseAuth = (): FirebaseAuth => {
    // セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウトさせる
    return getAuth(getFirebaseApp());
};

/**
 * @description メールアドレスとパスワードでログイン
 * */

export const login = async (email: string, password: string) => {
    const auth = getFirebaseAuth()
    const result = await signInWithEmailAndPassword(auth, email, password);
    const id = await result.user.getIdToken();

    await fetch("/api/session",{method: "POST", body: JSON.stringify({id})});
};

/**
 * @description ログアウトさせる
 */

export const logout = async () => {
    // セッションCookieを削除するため、Firebase SDKでなくREST APIでログアウトさせる
    await fetch("/api/sessionLogout", {method: "POST"})
};




