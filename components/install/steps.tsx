import type { ReactNode } from "react";
import Glyph from "@/components/install/glyphs";
import type { GuideId } from "@/lib/install/detect";

// One source for every install instruction: the /install page, the phone card and the
// laptop popover all read from here, so the short and long versions can't drift apart.
// Button names are the exact words people will see on screen (checked October 2026 against
// Apple, Google and Microsoft help pages; see the PR for the ones taken from other guides).

export type Guide = {
  id: GuideId;
  device: string;
  browser: string;
  steps: ReactNode[];
  // One or two lines for the phone card / laptop popover.
  short: ReactNode;
  note?: ReactNode;
  // The browser can show its own install window behind our Install button.
  promptable: boolean;
};

const L = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-stone-900">“{children}”</strong>;

function iosMenuGlyph(version: number | null) {
  // Safari 27 calls it the Page Menu button (three lines); Safari 26 the More button (⋯).
  if (version === null)
    return (
      <>
        <Glyph name="ios-page-menu" /> or <Glyph name="ios-more" />
      </>
    );
  return version >= 27 ? <Glyph name="ios-page-menu" /> : <Glyph name="ios-more" />;
}

export function getGuide(id: GuideId, iosVersion: number | null = null): Guide {
  const modern = iosVersion === null || iosVersion >= 26;
  switch (id) {
    case "ios-safari":
      return {
        id,
        device: "iPhone or iPad",
        browser: "Safari",
        promptable: false,
        short: (
          <>
            Tap <Glyph name="ios-share" /> <L>Share</L>, then <L>Add to Home Screen</L>.
          </>
        ),
        steps: [
          modern ? (
            <>
              Tap the Share button <Glyph name="ios-share" />. If you don&apos;t see it, tap {iosMenuGlyph(iosVersion)} next to the
              address bar first, then tap <L>Share</L>.
            </>
          ) : (
            <>
              Tap the Share button <Glyph name="ios-share" /> (at the bottom of the screen on iPhone, at the top on iPad).
            </>
          ),
          <>
            Scroll down the list and tap <L>Add to Home Screen</L> <Glyph name="ios-plus-square" />.
          </>,
          ...(modern
            ? [
                <>
                  Leave <L>Open as Web App</L> turned on <Glyph name="toggle-on" />.
                </>,
              ]
            : []),
          <>
            Tap <L>Add</L> in the top corner.
          </>,
          <>Find the AI Libraries icon on your Home Screen and open it from there.</>,
        ],
        note: (
          <>
            Can&apos;t find <L>Add to Home Screen</L>? Scroll to the very bottom of the list, tap <L>Edit Actions</L>, then add it.
          </>
        ),
      };
    case "ios-chrome":
      return {
        id,
        device: "iPhone or iPad",
        browser: "Chrome",
        promptable: false,
        short: (
          <>
            Tap <Glyph name="ios-share" /> <L>Share</L> in the address bar, then <L>Add to Home Screen</L>.
          </>
        ),
        steps: [
          <>
            Tap the Share button <Glyph name="ios-share" /> on the right of the address bar.
          </>,
          <>
            Tap <L>Add to Home Screen</L>.
          </>,
          <>
            Tap <L>Add</L>.
          </>,
          <>Find the AI Libraries icon on your Home Screen and open it from there.</>,
        ],
      };
    case "ios-edge":
      return {
        id,
        device: "iPhone or iPad",
        browser: "Edge",
        promptable: false,
        short: (
          <>
            Tap the menu <Glyph name="hamburger" />, then <L>Share</L>, then <L>Add to Home Screen</L>.
          </>
        ),
        steps: [
          <>
            Tap the menu button <Glyph name="hamburger" /> (it may look like <Glyph name="dots" />).
          </>,
          <>
            Tap <L>Share</L>.
          </>,
          <>
            Scroll down and tap <L>Add to Home Screen</L>.
          </>,
          <>
            Tap <L>Add</L>.
          </>,
        ],
        note: <>Don&apos;t see these buttons? Open this page in Safari and use the Safari steps.</>,
      };
    case "ios-firefox":
      return {
        id,
        device: "iPhone or iPad",
        browser: "Firefox",
        promptable: false,
        short: (
          <>
            Tap <Glyph name="ios-share" /> <L>Share</L> in the address bar, then <L>Add to Home Screen</L>.
          </>
        ),
        steps: [
          <>
            Tap the Share button <Glyph name="ios-share" /> in the address bar.
          </>,
          <>
            Tap <L>Add to Home Screen</L>.
          </>,
          <>
            Tap <L>Add</L>.
          </>,
        ],
        note: <>Firefox may put a letter on the icon instead of our logo. It still works. Safari shows the logo.</>,
      };
    case "ios-other":
      return {
        id,
        device: "iPhone or iPad",
        browser: "another browser",
        promptable: false,
        short: <>Open this page in Safari, then tap Share and Add to Home Screen.</>,
        steps: [
          <>
            Tap <L>Copy link</L> below.
          </>,
          <>Open Safari.</>,
          <>Tap the address bar, paste the link, and open it.</>,
          <>Follow the Safari steps on this page.</>,
        ],
      };
    case "in-app":
      return {
        id,
        device: "this app",
        browser: "the built-in browser",
        promptable: false,
        short: <>Installing doesn&apos;t work inside this app. Open the page in your regular browser first.</>,
        steps: [
          <>
            Look for a menu button, often <Glyph name="dots" /> or <Glyph name="kebab" /> in a corner of the screen.
          </>,
          <>
            Choose <L>Open in Safari</L>, <L>Open in browser</L>, or <L>Open in Chrome</L>.
          </>,
          <>
            No such option? Tap <L>Copy link</L> below, open Safari (iPhone) or Chrome (Android), and paste the link into the address bar.
          </>,
          <>Then come back to this page and follow the steps for that browser.</>,
        ],
      };
    case "android-chrome":
      return {
        id,
        device: "Android phone or tablet",
        browser: "Chrome",
        promptable: true,
        short: (
          <>
            Tap <Glyph name="kebab" />, then <L>Install and create shortcut</L>, then <L>Install</L>.
          </>
        ),
        steps: [
          <>
            Tap the More button <Glyph name="kebab" /> on the right of the address bar.
          </>,
          <>
            Tap <L>Install and create shortcut</L>. On older versions of Chrome it says <L>Add to Home screen</L> or <L>Install app</L>.
          </>,
          <>
            Tap <L>Install</L>.
          </>,
          <>Find the AI Libraries icon on your home screen or in your app list.</>,
        ],
      };
    case "android-edge":
      return {
        id,
        device: "Android phone or tablet",
        browser: "Edge",
        promptable: true,
        short: (
          <>
            Tap the menu <Glyph name="dots" />, then <L>Add to phone</L>, then <L>Install</L>.
          </>
        ),
        steps: [
          <>
            Tap the menu button <Glyph name="dots" /> at the bottom of the screen.
          </>,
          <>
            Tap <L>Add to phone</L>.
          </>,
          <>
            Tap <L>Install</L>.
          </>,
        ],
        note: <>Don&apos;t see these buttons? Open this page in Chrome and use the Chrome steps.</>,
      };
    case "android-samsung":
      return {
        id,
        device: "Samsung phone or tablet",
        browser: "Samsung Internet",
        promptable: true,
        short: (
          <>
            Tap the install icon <Glyph name="samsung-install" /> in the address bar, or the menu <Glyph name="hamburger" /> then <L>Add page to</L>.
          </>
        ),
        steps: [
          <>
            If you see an install icon <Glyph name="samsung-install" /> in the address bar, tap it and choose <L>Install</L>. You&apos;re done.
          </>,
          <>
            Otherwise, tap the menu button <Glyph name="hamburger" /> at the bottom right.
          </>,
          <>
            Tap <L>Add page to</L>, then <L>Home screen</L>.
          </>,
        ],
        note: <>Don&apos;t see these buttons? Open this page in Chrome and use the Chrome steps.</>,
      };
    case "android-other":
      return {
        id,
        device: "Android phone or tablet",
        browser: "this browser",
        promptable: false,
        short: <>Open this page in Chrome to install it.</>,
        steps: [
          <>
            Tap <L>Copy link</L> below.
          </>,
          <>Open Chrome.</>,
          <>Paste the link into the address bar and open it.</>,
          <>Follow the Chrome steps on this page.</>,
        ],
      };
    case "desktop-chrome":
      return {
        id,
        device: "Computer",
        browser: "Chrome",
        promptable: true,
        short: (
          <>
            Click the install icon <Glyph name="install-desktop" /> at the right end of the address bar, then <L>Install</L>.
          </>
        ),
        steps: [
          <>
            Click the install icon <Glyph name="install-desktop" /> at the right end of the address bar.
          </>,
          <>
            No icon? Click the More button <Glyph name="kebab" /> at the top right, then <L>Cast, save, and share</L>, then{" "}
            <L>Install page as app…</L>
          </>,
          <>
            Click <L>Install</L>.
          </>,
          <>The app opens in its own window. You can keep it in your taskbar or Dock.</>,
        ],
      };
    case "desktop-edge":
      return {
        id,
        device: "Computer",
        browser: "Edge",
        promptable: true,
        short: (
          <>
            Click the <L>App available</L> icon <Glyph name="edge-app" /> in the address bar, then <L>Install</L>.
          </>
        ),
        steps: [
          <>
            Click the <L>App available</L> icon <Glyph name="edge-app" /> in the address bar.
          </>,
          <>
            No icon? Click <L>Settings and more</L> <Glyph name="dots" /> at the top right, then <L>More tools</L>, then <L>Apps</L>, then{" "}
            <L>Install this site as an app</L>.
          </>,
          <>
            Click <L>Install</L>.
          </>,
          <>The app opens in its own window. You can pin it to your taskbar.</>,
        ],
      };
    case "mac-safari":
      return {
        id,
        device: "Mac",
        browser: "Safari",
        promptable: false,
        short: (
          <>
            In the menu bar, choose <L>File</L>, then <L>Add to Dock…</L>, then click <L>Add</L>.
          </>
        ),
        steps: [
          <>
            In the menu bar at the top of the screen, click <L>File</L>, then <L>Add to Dock…</L>
          </>,
          <>
            Or click the Share button <Glyph name="mac-share" /> in the Safari toolbar and choose <L>Add to Dock</L>.
          </>,
          <>
            Click <L>Add</L>.
          </>,
          <>Open AI Libraries from your Dock.</>,
        ],
        note: <>This needs macOS Sonoma (14) or later. On an older Mac, use Chrome or Edge instead.</>,
      };
    case "desktop-firefox":
      return {
        id,
        device: "Computer",
        browser: "Firefox",
        promptable: false,
        short: <>For the app, open this page in Chrome or Edge, or Safari on a Mac.</>,
        steps: [
          <>Firefox doesn&apos;t give you the full app version of this site.</>,
          <>Open this page in Chrome or Edge (or Safari on a Mac) and follow the steps for that browser.</>,
        ],
      };
    case "desktop-other":
      return {
        id,
        device: "Computer",
        browser: "this browser",
        promptable: false,
        short: <>For the app, open this page in Chrome or Edge, or Safari on a Mac.</>,
        steps: [
          <>This browser can&apos;t install the app.</>,
          <>Open this page in Chrome or Edge (or Safari on a Mac) and follow the steps for that browser.</>,
        ],
      };
  }
}

// Order and names for the "Show steps for another device" switcher.
export const guideMenu: { id: GuideId; label: string }[] = [
  { id: "ios-safari", label: "iPhone or iPad · Safari" },
  { id: "ios-chrome", label: "iPhone or iPad · Chrome" },
  { id: "ios-edge", label: "iPhone or iPad · Edge" },
  { id: "ios-firefox", label: "iPhone or iPad · Firefox" },
  { id: "android-chrome", label: "Android · Chrome" },
  { id: "android-samsung", label: "Android · Samsung Internet" },
  { id: "android-edge", label: "Android · Edge" },
  { id: "desktop-chrome", label: "Windows or Mac · Chrome" },
  { id: "desktop-edge", label: "Windows or Mac · Edge" },
  { id: "mac-safari", label: "Mac · Safari" },
  { id: "in-app", label: "Inside Facebook, LinkedIn, Instagram…" },
  { id: "desktop-firefox", label: "Firefox on a computer" },
];
