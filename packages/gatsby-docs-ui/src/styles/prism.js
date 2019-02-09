import prism from 'prismjs'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-typescript'
import lightTheme from 'prism-themes/themes/prism-vs.css'
import darkTheme from 'prism-themes/themes/prism-a11y-dark.css'

let styleNode

if (process.browser) {
  styleNode = document.createElement('style')
  styleNode.setAttribute('data-prism', 'true')
  if (document.head) {
    document.head.appendChild(styleNode)
  }
}

export function setPrismTheme(theme) {
  if (theme === 'light') {
    styleNode.textContent = lightTheme
  } else {
    styleNode.textContent = darkTheme
  }
}

export default prism
