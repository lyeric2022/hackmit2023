// import React, { useEffect } from 'react';

// function WatsonAssistantChat() {
//   useEffect(() => {
//     window.watsonAssistantChatOptions = {
//       integrationID: "774c318e-1fe1-48da-bdbc-cb1c40ea5e42",
//       region: "us-east",
//       serviceInstanceID: "9c21017b-327b-4e49-a4c7-425e319f9e39",
//       onLoad: function (instance) {
//         instance.render();
//       },
//     };

//     const t = document.createElement('script');
//     t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
//     document.head.appendChild(t);
//   }, []);

//   return (
//     <div id="WatsonAssistantChatContainer">
//       {/* This div will be replaced by the chat widget */}
//     </div>
//   );
// }

// export default WatsonAssistantChat;
