
# Tabliss

![Tabliss Screenshot](screenshot.png)

## 🚀 Maintained Fork of Tabliss

This repository is a maintained fork of Tabliss, originally a customizable new tab page for Firefox and Chrome. The original project has been abandoned, with no updates for over a year and numerous unmerged pull requests.

### Why This Fork?

I cloned the repository and merged most pending pull requests to bring in improvements and bug fixes. Moving forward, I will actively maintain and update this fork to keep Tabliss functional and up to date.

### What's Next?

- Continued updates and bug fixes
- Adding new features from community contributions
- Keeping dependencies up to date

If you were a contributor to the original repo or have ideas for improvements, feel free to open an issue or submit a pull request. Let’s keep Tabliss alive!

----------

## 🛠 Installation

Instructions in [INSTALL.md](INSTALL.md). You have to install manually as my version of the extension isn't on any extension stores. API keys are included with the release.

## 💻 Running Locally

For local development, you'll need Node.js and NPM installed. Latest versions should work.

First, clone the repo:

```sh
https://github.com/BookCatKid/tabliss-maintained.git
cd tabliss-maintained
```

If you want a simple build script after cloning the repo, see [BUILDING.md](BUILDING.md).

Then install the dependencies:

```sh
npm install
```

### Available Commands

- `npm run dev` — Start a local development server
- `npm run build` — Build the project
- `npm run test` — Run tests
- `npm run translations` — Manage translation files (see TRANSLATING.md)
- `npm run lint:fix` — Run ESLint with --fix (or just `npm run lint` for checking)
- `npm run prettier` — Run Prettier with --write (or npm run `prettier:check` for checking)

By default, build and dev will target the web version. To specify a platform (Chromium or Firefox), append `:chromium` or `:firefox` to the command. For example:

```sh
npm run dev:chromium
npm run build:firefox
```

To develop with external services, you'll need to sign up for API keys and enter them into your `.env` file. Start by copying the example:

```sh
cp .env.example .env
```

Then, fill in your API keys:

```ini
GIPHY_API_KEY=your_key_here
UNSPLASH_API_KEY=your_key_here
NASA_API_KEY=your_key_here
```

## 🙌 Credits

Special thanks to **joelshepherd** for originally creating and maintaining this project.  
Also, huge appreciation to everyone who contributed, especially those whose pull requests I merged!

## 🤝 Contributing

Take a look at the guide to [contributing](CONTRIBUTING.md) before starting.

## 🌍 Translations

Check out the guide to [adding translations](TRANSLATING.md).
