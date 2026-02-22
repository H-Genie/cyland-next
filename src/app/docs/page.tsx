import { getApiDocs } from "lib/swagger";
import ReactSwagger from "./react-swagger";

export const dynamic = "force-dynamic";

export default async function DocsPage() {
  const spec = await getApiDocs();
  return (
    <section style={{ minHeight: "100vh", width: "100%" }}>
      <ReactSwagger spec={spec} supportedSubmitMethods={["get"]} />
    </section>
  );
}
