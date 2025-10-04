import Main from "components/Main";
import GlobalStyle from "../../components/GlobalStyle";
import Providers from "../../components/Providers";

export default function WithChromeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <GlobalStyle />
      <Main>{children}</Main>
    </Providers>
  );
}
