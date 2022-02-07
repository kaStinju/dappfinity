import React from "react";

import { FileInput, Button } from "@blueprintjs/core";

export default function DocToLink() {
  var contract = true;
  var complete = false;
  return (
    <>
      <div id="infoBar"></div>
      <FileInput
        text="Add contract..."
        onInputChange={(e) => (contract = e.target.files[0])}
      />
      {/*pass the contract variable to the Functions.js component*/}
      {/*contract ? <Functions />*/}
      {contract && (
        <Button rightIcon="tick" text="Finished set up" intent="success" />
      )}
    </>
  );
}
