/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { Button, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { wordpress } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import {
	MENU_TEMPLATE_PARTS,
	MENU_TEMPLATES,
} from '../navigation-panel/constants';

function NavigationToggle( { icon, isOpen } ) {
	const {
		isActive,
		isRequestingSiteIcon,
		templateType,
		siteIconUrl,
	} = useSelect( ( select ) => {
		const { getTemplateType, isFeatureActive } = select( 'core/edit-site' );
		const { getEntityRecord } = select( 'core' );
		const { isResolving } = select( 'core/data' );
		const siteData =
			getEntityRecord( 'root', '__unstableBase', undefined ) || {};

		return {
			isActive: isFeatureActive( 'fullscreenMode' ),
			isRequestingSiteIcon: isResolving( 'core', 'getEntityRecord', [
				'root',
				'__unstableBase',
				undefined,
			] ),
			templateType: getTemplateType(),
			siteIconUrl: siteData.site_icon_url,
		};
	}, [] );

	const {
		openNavigationPanelToMenu,
		setIsNavigationPanelOpened,
	} = useDispatch( 'core/edit-site' );

	const toggleNavigationPanel = () => {
		if ( isOpen ) {
			setIsNavigationPanelOpened( ! isOpen );
			return;
		}
		openNavigationPanelToMenu(
			'wp_template' === templateType
				? MENU_TEMPLATES
				: MENU_TEMPLATE_PARTS
		);
	};

	if ( ! isActive ) {
		return null;
	}

	let buttonIcon = <Icon size="36px" icon={ wordpress } />;

	if ( siteIconUrl ) {
		buttonIcon = (
			<img
				alt={ __( 'Site Icon' ) }
				className="edit-site-navigation-toggle__site-icon"
				src={ siteIconUrl }
			/>
		);
	} else if ( isRequestingSiteIcon ) {
		buttonIcon = null;
	} else if ( icon ) {
		buttonIcon = <Icon size="36px" icon={ icon } />;
	}

	return (
		<div
			className={
				'edit-site-navigation-toggle' + ( isOpen ? ' is-open' : '' )
			}
		>
			<Button
				className="edit-site-navigation-toggle__button has-icon"
				label={ __( 'Toggle navigation' ) }
				onClick={ toggleNavigationPanel }
				showTooltip
			>
				{ buttonIcon }
			</Button>
		</div>
	);
}

export default NavigationToggle;
