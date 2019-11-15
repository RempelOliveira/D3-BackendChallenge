import React, { Fragment, useState } from "react";

import Collapsible from "react-collapsible";
import Highlight from "react-highlight";
import shortid from "shortid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tabs from "./Tabs";

function CollapsibleArea({ title, content = "" })
{
	const [isActive, setIsActive] =
		useState("css");

	const handleClick = (id) =>
	{
		setIsActive(id);

	};

	return (
		<Collapsible
			easing  	   = "ease-in-out"
			transitionTime = { 250 }
			trigger 	   = { <div className="collapsible-header"><span>{ title }</span><span><FontAwesomeIcon icon = {["fas", "chevron-down"]} /></span></div> }

		>
			<Tabs
				tabs =
				{[
					{ title: "CSS", 	   isActive: isActive === "css",  		onClick: () => handleClick("css") },
					{ title: "JavaScript", isActive: isActive === "javascript", onClick: () => handleClick("javascript") },
					{ title: "Images", 	   isActive: isActive === "images", 	onClick: () => handleClick("images") }

				]}

			/>
			<div className="tabs-content">
				{
					!content ? "" :
						<Fragment>
							<div className = { "tab-content" + (isActive === "css" ? " is-active" : "")} >
								{
									content.styles.map((item, i) =>
									{
										return (
											<Fragment key={ shortid.generate() }>
												<Highlight className="html">
													{ item }
												</Highlight>
												{
													i <= content.styles.length - 1 ? <div className="verticalSpace"></div> : ""
												}
											</Fragment>

										);

									})

								}
							</div>
							<div className = { "tab-content" + (isActive === "javascript" ? " is-active" : "")} >
								{
									content.scripts.map((item, i) =>
									{
										return (
											<Fragment key={ shortid.generate() }>
												<Highlight className="html">
													{ item }
												</Highlight>
												{
													i <= content.styles.length - 1 ? <div className="verticalSpace"></div> : ""
												}
											</Fragment>

										);

									})

								}
							</div>
							<div className = { "tab-content" + (isActive === "images" ? " is-active" : "")} >
								{
									content.images.map((item, i) =>
									{
										return (
											<Fragment key={ shortid.generate() }>
												<div className="highlight-image">
													<Highlight className="html">
														{ item }
													</Highlight>
													<div className="image" style={{backgroundImage: `url(${item})`}}></div>
												</div>
												{
													i <= content.images.length - 1 ? <div className="verticalSpace"></div> : ""
												}
											</Fragment>

										);

									})

								}
							</div>
						</Fragment>

				}
			</div>
		</Collapsible>

	);

}

export default CollapsibleArea;