# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),

and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add click action to GitHub widget.
- Add more error handling to unsplash. [#f6728cd](https://github.com/BookCatKid/tabliss-maintained/commit/f6728cdf9c5fbc18e67341ca976f39785623d9da)

## [1.2.1] - 3/4/2025

### Fixed

- Fix errors on Wikimedia Image of the Day. [#21d79ba](https://github.com/BookCatKid/tabliss-maintained/commit/21d79bada0ede075772098e7ba99e3045e17af54)

- Fix the open feather modal always being visible. [#9763891](https://github.com/BookCatKid/tabliss-maintained/commit/976389118713eb53071caa31c66afed963f34b66)

- Fix custom modal styles to apply only to quick links. [#37ee4fa](https://github.com/BookCatKid/tabliss-maintained/commit/37ee4fa4e4d552cfad6f404afa0a1931c2833f42)

### Changed

- Move to react-github-calendar [#3be1dfa](https://github.com/BookCatKid/tabliss-maintained/commit/3be1dfa53f751c7cadb526283788060f52a4075b)

- Make the custom uploads have the correct styles. [ba43558](https://github.com/BookCatKid/tabliss-maintained/commit/ba435588e1de85ad2704fd366370962d53a9c589)

- Change link display, so if the name is blank it displays a blank name instead of a formatted url. [#13de553](https://github.com/BookCatKid/tabliss-maintained/commit/13de5537c39d4ae17b194cbed5afd1ae4d62e7fe)

## [1.2.0] - 2/26/2025

### Added

- Add an option in quick links to preserve the aspect ratio of the image icon when resizing. [#14accf1](https://github.com/BookCatKid/tabliss-maintained/commit/14accf1b9feaf556bbca2a67c87b8e972cc09ab3)

- Add the ability to set both dimensions independently of the image icon in quick links. [#14accf1](https://github.com/BookCatKid/tabliss-maintained/commit/14accf1b9feaf556bbca2a67c87b8e972cc09ab3)

- Add option for scaling widgets with CSS transform. [#41a8b08](https://github.com/BookCatKid/tabliss-maintained/commit/41a8b0821e6a09fe438d7389f597b63008363f8c)

- Move the icon preloading to the existing utils.ts. [#5254ef6](https://github.com/BookCatKid/tabliss-maintained/commit/5254ef6d889c1266def0587088695f54ac47580c)

- Add caching for icons. [#ea317ff](https://github.com/BookCatKid/tabliss-maintained/commit/ea317ff29fb48a65ff0c585d347d8cec097962de)

- Add a modal for selecting the icon. [#d221677](https://github.com/BookCatKid/tabliss-maintained/commit/d2216777af3be64366a97bb09f3a273afc116cc5)

### Fixed

- Fix import with time defaulting to hiding the time. [#4a528db](https://github.com/BookCatKid/tabliss-maintained/commit/4a528db4cb708b0f009de29b3c99b50df4cda05c)

- Add more error handling for invalid plugins. [#3b4a3ba](https://github.com/BookCatKid/tabliss-maintained/commit/3b4a3ba9d888e7d62e8e3591eebf8e0aec39feb0)

- Fixed the issue where some input values in quick links weren't restored on reload. [#14accf1](https://github.com/BookCatKid/tabliss-maintained/commit/14accf1b9feaf556bbca2a67c87b8e972cc09ab3)

- Enhance error handling for invalid widgets. [#1449cd2](https://github.com/BookCatKid/tabliss-maintained/commit/1449cd25fb2c1f1c904e5783a3c2877377bd338b) and [#975898f](https://github.com/BookCatKid/tabliss-maintained/commit/975898f4e5a0c6afb48a63c0e75d5f643b01bd82)

- Update Custom Text widget to be able to specify when to change the text. [#8857fe0](https://github.com/BookCatKid/tabliss-maintained/commit/8857fe0d082ce637d131f0edac0ee5310cf67c16)

- Rework the svg display, make it more robust. [#8a6e665](https://github.com/BookCatKid/tabliss-maintained/commit/8a6e66547dac735fd648174a96ebede439492377)

- Fix caching of uploaded quick link images. [#80f67b4](https://github.com/BookCatKid/tabliss-maintained/commit/80f67b4e58b2fbedc36779b5537d1432a94447ed)

### Changed

- Update the support section to have a star on github button. [#f723d76](https://github.com/BookCatKid/tabliss-maintained/commit/f723d7602689fe7a79d5210d211bf88657620c03)

- Rename background/media back to background/image to preserve backwards compatibility. [#3b4a3ba](https://github.com/BookCatKid/tabliss-maintained/commit/3b4a3ba9d888e7d62e8e3591eebf8e0aec39feb0)

- Large reordering of the code for the quick links widget to make it more maintainable. [#14accf1](https://github.com/BookCatKid/tabliss-maintained/commit/14accf1b9feaf556bbca2a67c87b8e972cc09ab3)

- Rename custom ico url to Custom Image URL in quick links widget. [#14accf1](https://github.com/BookCatKid/tabliss-maintained/commit/14accf1b9feaf556bbca2a67c87b8e972cc09ab3)

- Change the location url for unsplash to be an href instead of js. [#f077ccd](https://github.com/BookCatKid/tabliss-maintained/commit/f077ccd6f0c298c6ef18bd70ff9a3c3dd38f3625)

### Removed

- Removed some unused function I added while testing the last release. [#0a0cc5c](https://github.com/BookCatKid/tabliss-maintained/commit/0a0cc5c6e7997c009bb67f58bf1b00b3de780651)

## [1.1.0] - 2/22/2025

### Changes not logged yet

## [1.0.0] - 2/24/2025

### Changes not logged yet :(

