import React, { memo } from "react";

const Utterances = () => {
  return (
    <section
      ref={(elem) => {
        if (!elem) return;
        const scriptElement = document.createElement("script");
        scriptElement.src = "https://utteranc.es/client.js";
        scriptElement.async = true;
        scriptElement.setAttribute("repo", "h-genie/cyland-next");
        scriptElement.setAttribute("issue-term", "pathname");
        scriptElement.setAttribute("theme", "boxy-light");
        scriptElement.setAttribute("crossorigin", "anonymous");
        elem.appendChild(scriptElement);
      }}
    />
  );
};

export default memo(Utterances);
