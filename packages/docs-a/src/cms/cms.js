import CMS from 'netlify-cms'

import { DocPreviewTemplate } from '@m00n/docs-ui'

CMS.registerPreviewTemplate('docs', DocPreviewTemplate)
