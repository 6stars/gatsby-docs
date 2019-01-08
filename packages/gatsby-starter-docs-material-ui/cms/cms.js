import CMS from 'netlify-cms'

import DocPreviewTemplate from './preview-templates/DocPreviewTemplate'
import "./admin.css"

CMS.registerPreviewTemplate('docs', DocPreviewTemplate)
