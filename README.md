# Bing Managed Component

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Released under the Apache license.](https://img.shields.io/badge/license-apache-blue.svg)](./LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Find out more about Managed Components [here](https://blog.cloudflare.com/zaraz-open-source-managed-components-and-webcm/) for inspiration and motivation details.

## 🚀 Quickstart local dev environment

1. Make sure you're running node version >=17.
2. Install dependencies with `npm i`
3. Run unit test watcher with `npm run test:dev`

### ti _required_

`number` The UET Tag ID is the unique identifier of your UET tag. [Learn more](https://help.ads.microsoft.com/apex/index/3/en/56705)

### evt _required_

`string` Event Type - Choose between tracking a page load or a custom event

### ea

`string` Event Action represents the type of user interaction you want to track. For example, `play` or `pause`. [Learn more](https://help.ads.microsoft.com/#apex/ads/en/56717/2-500)"

### ec

`string` Event Category represents the category of event you want to track. For example, `video`.

### ev

`string` Event Value - a numerical value associated with that event. For example, the length of the video played.

### el

`string` Event Label - the name of the element that caused the action. For example, `trailer` or `behindthescenes`

### gv

`string` Revenue Value is the revenue value of the event you want to track

### gvc

`string` Currency is the currency of the event you want to track

## 📝 License

Licensed under the [Apache License](./LICENSE).

## 💜 Thanks

Thanks to everyone contributing in any manner for this repo and to everyone working on Open Source in general.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/simonabadoiu"><img src="https://avatars.githubusercontent.com/u/1610123?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Simona Badoiu</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/bing/commits?author=simonabadoiu" title="Code">💻</a></td>
    <td align="center"><a href="https://yoavmoshe.com/about"><img src="https://avatars.githubusercontent.com/u/55081?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Yo'av Moshe</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/bing/commits?author=bjesus" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jonnyparris"><img src="https://avatars.githubusercontent.com/u/6400000?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Ruskin</b></sub></a><br /><a href="https://github.com/managed-components/@managed-components/bing/commits?author=jonnyparris" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
