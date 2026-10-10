// Works out which install steps fit this device and browser. Runs in the browser only.
import { isAppMode } from "@/lib/app-mode";

export type GuideId =
  | "ios-safari"
  | "ios-chrome"
  | "ios-edge"
  | "ios-firefox"
  | "ios-other"
  | "in-app"
  | "android-chrome"
  | "android-edge"
  | "android-samsung"
  | "android-other"
  | "desktop-chrome"
  | "desktop-edge"
  | "mac-safari"
  | "desktop-firefox"
  | "desktop-other";

export type InstallContext = {
  installed: boolean;
  guide: GuideId;
  // Phone or tablet (bottom card) vs computer (top bar).
  mobile: boolean;
  // Safari major version on iPhone/iPad: 27+ has the Page Menu button, 26 the More button.
  iosVersion: number | null;
  // Name of the app whose built-in browser this is (Facebook, LinkedIn...), when known.
  inAppName: string | null;
  // Browsers where nagging is pointless because there is no install option.
  canInstall: boolean;
};

const IN_APP: [RegExp, string][] = [
  [/FBAN|FBAV|FB_IAB|FBIOS/i, "Facebook"],
  [/Instagram/i, "Instagram"],
  [/LinkedInApp/i, "LinkedIn"],
  [/GSA\//, "the Google app"],
  [/Snapchat/i, "Snapchat"],
  [/Pinterest/i, "Pinterest"],
  [/MicroMessenger/i, "WeChat"],
  [/\bLine\//, "LINE"],
  [/Twitter|TwitterAndroid/i, "X"],
  [/TikTok|musical_ly|BytedanceWebview/i, "TikTok"],
  [/Teams\//i, "Teams"],
  [/Slack/i, "Slack"],
];

export function detectInstallContext(): InstallContext {
  const ua = navigator.userAgent;
  const installed = isAppMode();
  // iPadOS Safari reports itself as a Mac; touch support gives it away.
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const mobile = isIOS || isAndroid;
  const versionMatch = ua.match(/Version\/(\d+)/);
  const iosVersion = isIOS && versionMatch ? Number(versionMatch[1]) : null;

  const inApp = IN_APP.find(([re]) => re.test(ua));
  const androidWebView = isAndroid && /; wv\)/.test(ua);
  if (inApp || androidWebView) {
    return { installed, guide: "in-app", mobile, iosVersion, inAppName: inApp ? inApp[1] : null, canInstall: true };
  }

  let guide: GuideId;
  if (isIOS) {
    if (/CriOS/.test(ua)) guide = "ios-chrome";
    else if (/EdgiOS/.test(ua)) guide = "ios-edge";
    else if (/FxiOS/.test(ua)) guide = "ios-firefox";
    else if (/OPiOS|OPT\/|DuckDuckGo|Ddg\/|YaBrowser|Brave/.test(ua)) guide = "ios-other";
    else if (/Safari\//.test(ua) && versionMatch) guide = "ios-safari";
    else guide = "ios-other";
  } else if (isAndroid) {
    if (/SamsungBrowser/.test(ua)) guide = "android-samsung";
    else if (/EdgA/.test(ua)) guide = "android-edge";
    else if (/Firefox|OPR|Opera|UCBrowser|YaBrowser|MiuiBrowser|HuaweiBrowser/.test(ua)) guide = "android-other";
    else if (/Chrome\//.test(ua)) guide = "android-chrome";
    else guide = "android-other";
  } else {
    if (/Edg\//.test(ua)) guide = "desktop-edge";
    else if (/Firefox\//.test(ua)) guide = "desktop-firefox";
    else if (/OPR\/|Opera/.test(ua)) guide = "desktop-other";
    else if (/Chrome\//.test(ua)) guide = "desktop-chrome";
    else if (/Macintosh/.test(ua) && /Safari\//.test(ua) && versionMatch) guide = "mac-safari";
    else guide = "desktop-other";
  }

  const canInstall = !["desktop-firefox", "desktop-other"].includes(guide);
  return { installed, guide, mobile, iosVersion, inAppName: null, canInstall };
}
