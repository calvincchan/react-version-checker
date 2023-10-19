import { useEffect, useState } from "react";
import "./App.css";

const appVersion = __APP_VERSION__;
const versionCheckInterval = __VERSION_CHECK_INTERVAL__;

function App() {
  /** The remote version fetched from JSON */
  const [newVersion, setNewVersion] = useState("");
  const [showNewVersion, setShowNewVersion] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  /** Check version by comparing the built-in app version with signature.json. Add timestamp for cache busting. */
  useEffect(() => {
    const compareSignature = fetch(`/signature.json?${Date.now()}`)
      .then((res) => {
        return res.json();
      })
      .then((data: { version: string }) => {
        setNewVersion(data.version);
        setLastChecked(new Date());
        return data.version;
      });
    /** init run and update without prompt */
    compareSignature.then((version) => {
      if (version !== appVersion) {
        hardReloadPage();
      }
    });
    /** interval run and show prompt if update is needed */
    const timer = setInterval(() => {
      compareSignature.then((version) => {
        if (version !== appVersion) {
          setShowNewVersion(true);
        }
      });
    }, versionCheckInterval);
    return () => clearInterval(timer);
  }, []);

  /** Use your favorite way to perform a hard reload on the current page. */
  function hardReloadPage() {
    window.location.reload();
  }

  return (
    <>
      <p>Your version: {appVersion}</p>
      <p>Remote version: {newVersion}</p>
      <p>Check interval: {versionCheckInterval}</p>
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
