---
title: Sample Table Glossary
cover: /upload/valley.jpg
description: A Sample Table Based Doc
date: 2019-01-02T06:00:00.000Z
route: /config/settings/glossary
slug: config_settings_glossary
category: config
tags:
  - table
  - sample
---

| Name                                                    | Type                                                                                                 | Default                                 | Description                                                                                                                                                                                                                   |
| :------------------------------------------------------ | :--------------------------------------------------------------------------------------------------- | :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <span class="prop-name">action</span>                   | <span class="prop-type">node                                                                         |                                         | The action to display in the card header.                                                                                                                                                                                     |
| <span class="prop-name">avatar</span>                   | <span class="prop-type">node                                                                         |                                         | The Avatar for the Card Header.                                                                                                                                                                                               |
| <span class="prop-name">classes</span>                  | <span class="prop-type">object                                                                       |                                         | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details.                                                                                                                       |
| <span class="prop-name">component</span>                | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component.                                                                                                                                    |
| <span class="prop-name">disableTypography</span>        | <span class="prop-type">bool                                                                         | <span class="prop-default">false</span> | If `true`, the children won't be wrapped by a Typography component. This can be useful to render an alternative Typography variant by wrapping the `title` text, and optional `subheader` text with the Typography component. |
| <span class="prop-name">subheader</span>                | <span class="prop-type">node                                                                         |                                         | The content of the component.                                                                                                                                                                                                 |
| <span class="prop-name">subheaderTypographyProps</span> | <span class="prop-type">object                                                                       |                                         | These props will be forwarded to the subheader (as long as disableTypography is not `true`).                                                                                                                                  |
| <span class="prop-name">title</span>                    | <span class="prop-type">node                                                                         |                                         | The content of the Card Title.                                                                                                                                                                                                |
| <span class="prop-name">titleTypographyProps</span>     | <span class="prop-type">object                                                                       |                                         | These props will be forwarded to the title (as long as disableTypography is not `true`).                                                                                                                                      |

---
