import { LitElement, html } from 'lit'
import { TWStyles } from '../styles/output'
import { customElement } from 'lit/decorators.js'

@customElement('page-root')
class PageRoot extends LitElement {
	static styles = TWStyles
	render() {
		return html`<slot></slot>`
	}
}

export { PageRoot }
