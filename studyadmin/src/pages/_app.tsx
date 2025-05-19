import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Nav from '@/components/Nav';

// 모든것을 포함하는 전역 컴포넌트
export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
        <Nav></Nav>
        <Component {...pageProps} />
      </>
  );
}
