import "@/styles/globals.scss";
//타입스크립트때문에 type이라는 명령어가 붙는데, 이리 선언하면 나중에 얘를 안쓸때 컴파일을 안하고 넘어간다
import type { AppProps } from "next/app";
import NavBar from "@/components/NavBar";

export default function App({ Component, pageProps }: AppProps) {
  return (<>
        <NavBar />
        <Component {...pageProps} />
      </>
  );
}

// component - page에 파일을 만들면 바로 그게 component가 된다 - 자동인식 가능 - 임포트 따로 할 필요가 1도없다는말이다
// pageProps - 혹시 그 컴포넌트가 전달할 값이 있다면 얘가 받는다.

