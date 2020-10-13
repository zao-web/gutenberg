/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { BlockQuotation } from '@wordpress/components';

export default function QuoteEdit( { attributes, setAttributes, className } ) {
	const { align } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( className, {
			[ `has-text-align-${ align }` ]: align,
		} ),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ align }
					onChange={ ( nextAlign ) => {
						setAttributes( { align: nextAlign } );
					} }
				/>
			</BlockControls>
			<BlockQuotation { ...innerBlocksProps } />
		</>
	);
}
