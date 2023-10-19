import { useCallback, useEffect, useState } from "react";
import "./App.css";

const appVersion = __APP_VERSION__;
const versionCheckInterval = __VERSION_CHECK_INTERVAL__;

function App() {
  /** The remote version fetched from JSON */
  const [newVersion, setNewVersion] = useState("");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  /** Fetch remote version from signature.json. Add timestamp for cache busting. */
  const fetchRemoteVersion = useCallback(
    () =>
      fetch(`/signature.json?${Date.now()}`, {
        cache: "no-store",
      })
        .then((res) => {
          return res.json();
        })
        .then((data: { version: string }) => {
          setNewVersion(data.version);
          setLastChecked(new Date());
          return data.version;
        }),
    []
  );

  const [showNewVersion, setShowNewVersion] = useState(false);

  useEffect(() => {
    /** initial run and update without prompt */
    fetchRemoteVersion().then((version) => {
      if (version !== appVersion) {
        hardReloadPage();
      }
    });

    /** interval run and show prompt if update is needed */
    const timer = setInterval(() => {
      fetchRemoteVersion().then((version) => {
        if (version !== appVersion) {
          setShowNewVersion(true);
        } else {
          console.log("version not changed");
        }
      });
    }, versionCheckInterval);
    return () => clearInterval(timer);
  }, [fetchRemoteVersion]);

  /** Use your favorite way to perform a hard reload on the current page. */
  function hardReloadPage() {
    window.location.reload();
  }

  return (
    <>
      <p>Local version: {appVersion}</p>
      <p>Remote version: {newVersion}</p>
      <p>Check interval: {versionCheckInterval / 1000} seconds</p>
      <p>Last checked: {lastChecked?.toLocaleString()}</p>
      {showNewVersion && (
        <div>
          <h3>Update Available</h3>
          <p>A new version is available. Would you like to update now?</p>
          <p>Your version: {appVersion}</p>
          <p>New version: {newVersion}</p>
          <button onClick={hardReloadPage}>Update Now</button>
        </div>
      )}
    </>
  );
}

export default App;
