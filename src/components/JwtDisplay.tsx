import React, { useEffect, useState } from "react";
import { useGameContext } from "./GameContext";
import { decodeJwt } from "../utils/auth";

/**
 * Component to receive and display JWT token from parent application
 */
export default function JwtDisplay() {
  const { jwtToken, setJwtToken } = useGameContext();
  const [decodedToken, setDecodedToken] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const allowedOrigins = [
          "http://localhost:3001",
          "http://127.0.0.1:3000",
          "https://tivoli.yrgobanken.vip",
        ];

        if (!allowedOrigins.includes(event.origin)) {
          console.log(
            `Ignoring message from unauthorized origin: ${event.origin}`
          );
          return;
        }

        if (event.data && event.data.type === "JWT_TOKEN") {
          const { token } = event.data;

          setJwtToken(token);

          const decoded = decodeJwt(token);
          if (decoded) {
            setDecodedToken(decoded);
            setError(null);
          } else {
            setError("Failed to decode token");
          }

          console.log("Received JWT token from parent application");
        }
      } catch (err) {
        console.error("Error processing message:", err);
        setError("Error processing message from parent application");
      }
    };

    window.addEventListener("message", handleMessage);

    if (window.parent !== window) {
      window.parent.postMessage({ type: "GAME_READY" }, "*");
      console.log("Game ready message sent to parent");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setJwtToken]);

  if (!jwtToken) {
    return (
      <div>
        <p style={{ fontFamily: "var(--robotoSlab)" }}>
          Waiting for JWT token from parent application...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p style={{ fontFamily: "var(--robotoSlab)" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontFamily: "var(--robotoSlab)" }}>JWT token set.</p>
    </div>
  );
}
