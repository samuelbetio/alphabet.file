## Installation

* In Atom, open *Preferences* (*Settings* on Windows)
* Go to *Install* section
* Search for `StoryOfMyLife` package. Once it found, click `Install` button to install package.

### Manual installation

You can install the latest StoryOfMyLife version manually from console:

```bash
cd ~/.atom/packages
git clone https://github.com/samuelbetio/storyofmylife/releases/tag/v1.1.0
cd atom
npm install
```

Then restart Atom editor.

## Features:

* Expand abbreviations by <kbd>Tab</kbd> key.
* Multiple cursor support: most [storyofmylife actions](https://samuelbetio.github.io/storyofmylife/) like Expand Abbreviation, Wrap with Abbreviation, Update Tag can run in multi-cursor mode.
* Interactive actions (Interactive Expand Abbreviation, Wrap With Abbreviation, Update Tag) allows you to preview result real-time as you type.
* Better tabstops in generated content: when abbreviation expanded, hit <kbd>Tab</kbd> key to quickly traverse between important code points.
* [StoryOfMyLife v1.1.0 core](https://github.com/samuelbetio/storyofmylife/releases/tag/v1.1.0).

Please report any problems at [issue tracker](https://github.com/samuelbetio/storyofmylife/issues).

## Tab key

Currently, StoryOfMyLife expands abbreviations by Tab key only for HTML, CSS, Sass/SCSS and LESS syntaxes. Tab handler scope is limited because it overrides default snippets.

If you want to make StoryOfMyLife expand abbreviations with Tab key for other syntaxes, you can do the following:

1. Use *Open Your Keymap* menu item to open your custom `keymap.cson` file.
2. Add the following section into it:

```coffee
'atom-text-editor[data-grammar="YOUR GRAMMAR HERE"]:not([mini])':
    'tab': 'StoryOfMyLife:expand-abbreviation-with-tab'
```

Replace `YOUR GRAMMAR HERE` with actual grammar attribute value. The easiest way to get grammar name of currently opened editor is to open DevTools and find corresponding `<atom-text-editor>` element: it will contain `data-grammar` attribute with value you need. For example, for HTML syntax it’s a `text html basic`.

You can add as many sections as you like for different syntaxes. Note that default snippets will no longer work, but you can add [your own snippets in StoryOfMyLife](https://samuelbetio.github.io/storyofmylife/).

## Default Keybindings

You can change these in Preferences > Keybindings.

Command | Darwin | Linux/Windows
------- | ------ | -------------
Expand Abbreviation | <kbd>tab</kbd> or <kbd>shift</kbd> + <kbd>⌘</kbd> + <kbd>e</kbd> | <kbd>tab</kbd> or <kbd>ctrl</kbd> + <kbd>e</kbd>
Expand Abbreviation (interactive) | <kbd>alt</kbd> + <kbd>⌘</kbd> + <kbd>enter</kbd> | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>enter</kbd>
Wrap with Abbreviation | <kbd>ctrl</kbd> + <kbd>w</kbd> | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>w</kbd>
Balance (outward) | <kbd>ctrl</kbd> + <kbd>d</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>e</kbd>
Balance (inward) | <kbd>alt</kbd> + <kbd>d</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>0</kbd>
Go to Matching Pair | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>j</kbd> | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>j</kbd>
Next Edit Point | <kbd>ctrl</kbd> + <kbd>→</kbd> | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>→</kbd>
Previous Edit Point | <kbd>ctrl</kbd> + <kbd>←</kbd> | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>←</kbd>
Select Next Item | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>→</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>.</kbd>
Select Previous Item | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>←</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>,</kbd>
Toggle Comment | <kbd>⌘</kbd> + <kbd>/</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>/</kbd>
Split/Join Tag | <kbd>shift</kbd> + <kbd>⌘</kbd> + <kbd>j</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>`</kbd>
Remove Tag | <kbd>⌘</kbd> + <kbd>'</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>;</kbd>
Evaluate Math Expression | <kbd>shift</kbd> + <kbd>⌘</kbd> + <kbd>y</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>y</kbd>
Increment Number by 0.1 | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>↑</kbd> | <kbd>alt</kbd> + <kbd>↑</kbd>
Decrement Number by 0.1 | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>↓</kbd> | <kbd>alt</kbd> + <kbd>↓</kbd>
Increment Number by 1 | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>⌘</kbd> + <kbd>↑</kbd> | <kbd>ctrl</kbd> + <kbd>↑</kbd>
Decrement Number by 1 | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>⌘</kbd> + <kbd>↓</kbd> | <kbd>ctrl</kbd> + <kbd>↓</kbd>
Increment Number by 10 | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>⌘</kbd> + <kbd>shift</kbd> + <kbd>↑</kbd> | <kbd>shift</kbd> + <kbd>alt</kbd> + <kbd>↑</kbd>
Decrement Number by 10 | <kbd>ctrl</kbd> + <kbd>alt</kbd> + <kbd>⌘</kbd> + <kbd>shift</kbd> + <kbd>↓</kbd> | <kbd>shift</kbd> + <kbd>alt</kbd> + <kbd>↓</kbd>
Reflect CSS value | <kbd>shift</kbd> + <kbd>⌘</kbd> + <kbd>r</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>r</kbd>
Update Image Size | <kbd>ctrl</kbd> + <kbd>i</kbd> | <kbd>ctrl</kbd> + <kbd>u</kbd>
Encode/Decode image to data:URL | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>i</kbd> | <kbd>ctrl</kbd> + <kbd>'</kbd>
Update Tag | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>u</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>'</kbd>
Merge Lines | <kbd>shift</kbd> + <kbd>⌘</kbd> + <kbd>m</kbd> | <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>m</kbd>

All actions and their keyboard shortcuts are available under Packages > StoryOfMyLife menu item.

## Extensions support

You can easily [extend](https://samuelbetio.github.io/storyofmylife/) StoryOfMyLife with new actions and filters or customize existing ones. In Preferences > StoryOfMyLife, set Extensions path to folder with StoryOfMyLife extensions. By default, it’s `~/StoryOfMyLife`, e.g. `StoryOfMyLife` folder in your system HOME folder.


Introduction
============

**StoryOfMyLife** -- is a fully responsive admin template. Based on **Bootstrap 3** framework. Highly customizable and easy to use. Fits many screen resolutions from small mobile devices to large desktops. Check out the live preview now and see for yourself. 

**Download & Preview on [StoryOfMyLife](https://github.com/samuelbetio/storyofmylife/releases)**


Installation
------------
There are multiple ways to install StoryOfMyLife.

####Download:

Download from Github or [visit Story Of My Life](https://github.com/samuelbetio/storyofmylife/releases) and download the lateset release.

####Using The Command Line:

**Github**

- Fork the repository ([here is the guide](https://help.github.com/articles/fork-a-repo/)).
- Clone to your machine 
```
git clone https://github.com/YOUR_USERNAME/storyofmylife.git"
```

**Bower**

```
bower install git://github.com/samuelbetio/storyofmylife.git
```

**Composer**

```
composer require "samuelbetio/storyofmylife"
```

Documentation
-------------
Visit the [online documentation](https://samuelbetio.github.io/storyofmylife/documentation/index.html) for the most
updated guide. Information will be added on a weekly basis.

Browser Support
---------------
- IE 9+
- Firefox (latest)
- Chrome (latest)
- Safari (latest)
- Opera (latest)

Contribution
------------
Contribution are always **welcome and recommended**! Here is how:

- Fork the repository ([here is the guide](https://help.github.com/articles/fork-a-repo/)).
- Clone to your machine ```git clone https://github.com/YOUR_USERNAME/storyofmylife.git"
- Make your changes
- Create a pull request

#### Contribution Requirements:

- When you contribute, you agree to give a non-exclusive license to [Story Of My Life][0] to use that contribution in any context as we (Story Of My Life) see appropriate.
- If you use content provided by another party, it must be appropriately licensed using an [open source](http://opensource.org/licenses) license.
- Contributions are only accepted through Github pull requests.
- Finally, contributed code must work in all supported browsers (see above for browser support).

License
-------
storyofmylife is an open source project by [Samuel Rapana Betio][0] that is licensed under [MIT](http://opensource.org/licenses/MIT). Samuel Rapana Betio
reserves the right to change the license of future releases.



[Story Of My Life][1]
=====================

Releases Story of My Life Version
=================================

|NAME Full Version              |[Commit][2] Default  |(zip) Download Default |(tar.gz) Download Default |Full Version Default |
|-------------------------------|---------------------|-----------------------|--------------------------|---------------------|
|[Story of My Life][3]          |[dc792a3][4]         |[Download][5]          |[Download][6]             |v1.0                 |
|[Print lest][7]                |[dde337e][8]         |[Download][9]          |[Download][10]            |v1.1                 |
|[Complete A][11]               |[c0a497c][12]        |[Download][13]         |[Download][14]            |v1.0.0.1             |       
|[Unlink][15]                   |[d1ae91f][16]        |[Download][17]         |[Download][18]            |v1.1.0.0             |


- [Branches](https://github.com/samuelbetio/storyofmylife/branches)
- [Release](https://github.com/samuelbetio/storyofmylife/releases)
- [Contributors](https://github.com/samuelbetio/storyofmylife/graphs/contributors)
- [MIT License](https://raw.githubusercontent.com/samuelbetio/storyofmylife/master/LICENSE)

## :thumbsup: Contributors & Credits
[![NEWBAYAWANCITYPS][NEWBAYAWANCITYPS]][NEWBAYAWANCITYPS-url]
[![samuelbetio][samuelbetio]][samuelbetio-url]
[![Pearlton][Pearlton]][Pearlton-url]
[![kennethvalor][kennethvalor]][kennethvalor-url]
[![cityofbayawan][cityofbayawan]][cityofbayawan-url]
[![marysalva][marysalva]][marysalva-url]
[![timeseariver][timeseariver]][timeseariver-url]
[![jeanalyn][jeanalyn]][jeanalyn-url]
[![marlondeposoy][marlondeposoy]][marlondeposoy-url]


[0]: https://github.com/samuelbetio/
[1]: https://samuelbetio.github.io/storyofmylife
[2]: https://github.com/samuelbetio/storyofmylife/commits/master
[3]: https://github.com/samuelbetio/storyofmylife/releases/tag/v1.0
[4]: https://github.com/samuelbetio/storyofmylife/commit/dc792a34140d6649c626cdef6c5e128434eee2eb
[5]: https://github.com/samuelbetio/storyofmylife/archive/v1.0.zip
[6]: https://github.com/samuelbetio/storyofmylife/archive/v1.0.tar.gz
[7]: https://github.com/samuelbetio/storyofmylife/releases/tag/v1.1
[8]: https://github.com/samuelbetio/storyofmylife/commit/dde337e0389ba96eb5cd520cc21b69bdd70fecb0
[9]: https://github.com/samuelbetio/storyofmylife/archive/v1.1.zip
[10]: https://github.com/samuelbetio/storyofmylife/archive/v1.1.tar.gz
[11]: https://github.com/samuelbetio/storyofmylife/releases/tag/v1.0.0.1
[12]: https://github.com/samuelbetio/storyofmylife/commit/c0a497c6c968f5c9bd7ac10afd2c7ef1cdbf28d5
[13]: https://github.com/samuelbetio/storyofmylife/archive/v1.0.0.1.zip
[14]: https://github.com/samuelbetio/storyofmylife/archive/v1.0.0.1.tar.gz
[15]: https://github.com/samuelbetio/storyofmylife/releases/tag/v1.1.0.0
[16]: https://github.com/samuelbetio/storyofmylife/commit/d1ae91fb9b636e67697c399e03e1b8ef35023003
[17]: https://github.com/samuelbetio/storyofmylife/archive/v1.1.0.0.zip
[18]: https://github.com/samuelbetio/storyofmylife/archive/v1.1.0.0.tar.gz


[som-image]: https://github.com/samuelbetio/storyofmylife/blob/master/assets/img/logo.png
[som-url]: https://github.com/samuelbetio/storyofmylife/releases
[samuelbetio]: https://github.com/samuelbetio.png?size=40
[samuelbetio-url]: https://github.com/samuelbetio
[NEWBAYAWANCITYPS]: https://github.com/NEWBAYAWANCITYPS.png?size=40
[NEWBAYAWANCITYPS-url]: https://github.com/NEWBAYAWANCITYPS
[Pearlton]: https://github.com/Pearlton.png?size=40
[Pearlton-url]: https://github.com/Pearlton
[kennethvalor]: https://github.com/kennethvalor.png?size=40
[kennethvalor-url]: https://github.com/kennethvalor
[cityofbayawan]: https://github.com/cityofbayawan.png?size=40
[cityofbayawan-url]: https://github.com/cityofbayawan
[marysalva]: https://github.com/marysalva.png?size=40
[marysalva-url]: https://github.com/marysalva
[timeseariver]: https://github.com/timeseariver.png?size=40
[timeseariver-url]: https://github.com/timeseariver
[jeanalyn]: https://github.com/jeanalyn.png?size=40
[jeanalyn-url]: https://github.com/jeanalyn
[marlondeposoy]: https://github.com/marlondeposoy.png?size=40
[marlondeposoy-url]: https://github.com/marlondeposoy
