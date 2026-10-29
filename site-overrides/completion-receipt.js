/* Page-entry notifications retired: only the two attendance buttons send email. */
(()=>{'use strict';
// Preserve the finale's cancellation interface without sending a page-view email.
window.CompletionReceipt=Object.freeze({reached(){return ()=>{};}});
})();
