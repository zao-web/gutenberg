/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';

export default function useFocusableIframe( ref ) {
	useEffect( () => {
		const iframe = ref.current || ref();
		const { ownerDocument } = iframe;
		const { defaultView } = ownerDocument;
		const { FocusEvent } = defaultView;

		/**
		 * Checks whether the iframe is the activeElement, inferring that it has
		 * then received focus, and calls the `onFocus` prop callback.
		 */
		function checkFocus() {
			if ( ownerDocument.activeElement !== iframe ) {
				return;
			}

			const focusEvent = new FocusEvent( 'focus', { bubbles: true } );

			iframe.dispatchEvent( focusEvent );
		}

		defaultView.addEventListener( 'blur', checkFocus );

		return () => {
			defaultView.removeEventListener( 'blur', checkFocus );
		};
	}, [] );
}
