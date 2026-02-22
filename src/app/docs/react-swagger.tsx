"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type SwaggerUIOptions = {
  spec: Record<string, unknown>;
  supportedSubmitMethods?: Array<"get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace">;
};

export default function ReactSwagger({ spec, supportedSubmitMethods }: SwaggerUIOptions) {
  return (
    <div className="swagger-ui-wrap">
      <SwaggerUI spec={spec} supportedSubmitMethods={supportedSubmitMethods} />
    </div>
  );
}
