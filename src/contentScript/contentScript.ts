// TODO: content script
let Data = { Title: "", URL: "" };

// chrome.tabs.getSelected((tab) => {
//   // 現在のタブを取得
//   Data.Title = tab.title; // tabに現在のタブが格納されている（？）。
//   Data.URL = tab.url; // tab.titleには現在開いているタブのページタイトルが、tab.urlにはURLが格納されている。
//   console.log(`Title: ${Data.Title}`); // 出力は、「ポップアップを検証」で見れる。
//   console.log(`URL: ${Data.URL}`);
// });

// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions);
//   console.log({ tab });
//   return tab;
// }

// getCurrentTab();

// chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//   const url = tabs[0].url; // ←これ
//   alert(url);
// });
