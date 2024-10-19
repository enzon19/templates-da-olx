chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason == "install") {
    chrome.tabs.create({
      url: "/tabs/welcome.html",
    });
    chrome.runtime.setUninstallURL('https://forms.gle/1fgajSwETvi3fAJY8');
  } 
  // else if (details.reason == "update") {
  //   chrome.tabs.create({
  //     url: "/pages/updated.html",
  //   });
  // }
});