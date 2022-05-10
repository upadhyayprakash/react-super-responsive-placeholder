import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { x } from "@xstyled/emotion";
import { CustomIcon } from "../../../Components/CustomIcon";

interface PlaceholderProps {
	label?: string;
	icon?: string;
	color?: string;
}

export const Placeholder: FC<PlaceholderProps> = ({ label, color, icon }) => {
	const [height, setHeight] = useState(0);
	const [width, setWidth] = useState(0);

	const placeholderRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (placeholderRef.current) {
			const boundingRect = placeholderRef.current.getBoundingClientRect();
			setHeight(boundingRect.height);
			setWidth(boundingRect.width);
		}
	}, [placeholderRef]);

	const horizontalLine = (
		<x.line x1="1em" y1="50%" x2="calc(100% - 1em)" y2="50%" stroke="#cccccc" strokeWidth="1px"></x.line>
	);
	const verticalLine = (
		<x.line x1="50%" y1="1em" x2="50%" y2="calc(100% - 1em)" stroke="#cccccc" strokeWidth="1px"></x.line>
	);
	const topLeftToBottomRight = (
		<x.line x1="1em" y1="1em" x2="calc(100% - 1em)" y2="calc(100% - 1em)" stroke="#cccccc" strokeWidth="1px"></x.line>
	);
	const topRightToBottomLeft = (
		<x.line x1="calc(100% - 1em)" y1="1em" x2="1em" y2="calc(100% - 1em)" stroke="#cccccc" strokeWidth="1px"></x.line>
	);

	return (
		<x.div
			ref={placeholderRef}
			backgroundColor={color || "#e6e6e6"}
			w="100%"
			h="100%"
			display="flex"
			alignItems="center"
			justifyContent="center"
			position="relative"
		>
			{(label || icon) && (
				<x.div
					zIndex="1"
					display="flex"
					flexDirection="column"
					rowGap="1em"
					alignItems="center"
					padding="0.5em"
					backgroundColor={color || "#e6e6e6"}
				>
					{icon && <CustomIcon name={icon} size={"40px"} color="#999" />}
					{label && (
						<x.p fontSize="1.2em" textAlign="center" fontWeight="400" color="#999" textTransform="uppercase">
							{label}
						</x.p>
					)}
				</x.div>
			)}
			{/* This is background vector lines logic
			 * Render Horizontal line when height is less than 100
			 * Render Vertical line when width is less than 100
			 * Render Diagonal "lines" when width && height is more than 100
			 */}
			<x.svg height="100%" width="100%" position="absolute">
				{width < 100 && verticalLine}
				{height < 100 && horizontalLine}
				{width >= 100 && height >= 100 && (
					<React.Fragment>
						{topLeftToBottomRight}
						{topRightToBottomLeft}
					</React.Fragment>
				)}
			</x.svg>
		</x.div>
	);
};
