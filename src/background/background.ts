// TODO: background script

chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
  // async function getCurrentTab() {
  //   let queryOptions = { active: true, lastFocusedWindow: true };
  //   // `tab` will either be a `tabs.Tab` instance or `undefined`.
  //   let [tab] = await chrome.tabs.query(queryOptions);
  //   console.log({ tab });
  //   return tab;
  // }
  // getCurrentTab();
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    console.log({ tabs });
    const url = tabs[0].url; // ←これ
    console.log({ url });
  });
});

// chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
//   console.log({ tabs });
//   const url = tabs[0].url; // ←これ
//   console.log({ url });
// });
