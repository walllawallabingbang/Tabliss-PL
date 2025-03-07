import React from "react";
import Modal from "./modal/Modal";

type Props = {
  onClose: () => void;
};

const StoreError: React.FC<Props> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="Settings">
        <h2 style={{ margin: 0 }}>Storage Error</h2>
        <p style={{ fontSize: "1.25em" }}>
          Tabliss is unable to load or save settings. This is most commonly
          caused by running in private browsing mode; but low disk space or a
          corrupt browser profile can also be the problem.
        </p>
        <p>
          If you have settings saved with Tabliss, it might be a temporary
          issue. Try restarting your browser and checking if your settings
          return.
        </p>
        <p>
          If they do not return, the{" "}
          <a href="https://tabliss.io/support.html">support guide</a> covers the
          common causes and how to resolve them. Otherwise, create an issue at{" "}
          <a href="https://github.com/BookCatKid/tabliss-maintained/issues/new">GitHub</a> if you are still unable to solve the issue.
        </p>
      </div>
    </Modal>
  );
};

export default StoreError;
