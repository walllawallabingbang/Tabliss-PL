# How to Download the extension and add it to your browser

## Step 1: Download the Extension

### Option 1: Download from GitHub Releases (Recommended)

1. **Go to the [Releases page](https://github.com/BookCatKid/tabliss-maintained/releases)** of the repository
2. Find the latest release
3. Download the appropriate file:
   - For Firefox: `tabliss-firefox-signed.xpi`
   <!-- node to self: use `powershell curl -O $(curl -s "https://addons.mozilla.org/api/v5/addons/addon/tabliss-maintained/" | jq -r ".current_version.file.url")` to download latest signed version from firefox store. -->
   - For Chrome/Chromium: `tabliss-chromium.zip`
   - For Firefox (unsigned version): `tabliss-firefox.zip` (expert)

### Option 2: Download Nightly Builds from GitHub Actions

1. **Go to the Actions tab** of your repository on GitHub.
2. Click on the latest workflow with a green checkmark.
3. Scroll down to the **Artifacts** section.
4. Click on the `.zip` file to download the extension.

**Note:** If you don't see a download button next to the artifacts, you may not be logged into GitHub. You can either:

- Log in to GitHub and try again (recommended)
- Visit [nightly.link](https://nightly.link) and paste the artifact link there

## Step 2: Install the Extension in Your Browser

- Firefox:
  1. Go to  about\:addons
  2. Click the gear icon
  3. Click "Install Add-on from File"
  4. Select the .zip or .xpi file you downloaded
- Chromium:
  1. Unzip the .zip file into a folder
  2. Go to chrome://extensions/
  3. Enable developer mode
  4. Click Load Unpacked
  5. Select the folder you unzipped to. (make sure it has manifest.json in it)

## Notes

- If you need extra help just create an issue and I will help.

---

Now your browser extension should be up and running!
