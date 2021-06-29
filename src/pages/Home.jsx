import { Spinner } from "react-bootstrap";
import React, { Suspense } from "react";
import Channels from "../components/Channels";

function Home() {
  return (
    <div>
      <h2 className="title">
        <span>Channels</span>
      </h2>
      <Suspense
        className="text-center"
        fallback={<Spinner animation="border" variant="secondary" />}
      >
        <Channels />
      </Suspense>
    </div>
  );
}

export default Home;
