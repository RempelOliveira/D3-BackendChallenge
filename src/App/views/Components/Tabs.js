import React from "react";
import shortid from "shortid";

function Tabs({ tabs })
{
	return (
		<div className="tabs">
			<ul>
				{
					tabs.map(item =>
					{					
						return (
							<li
								key		  = { shortid.generate() }
								onClick   = { item.onClick }
								className = { item.isActive ? "is-active" : "" }

							>
								<button
								
									type      = "button"
									className = { "button button-link" + (item.isActive ? " is-info" : " is-white has-text-black") }

								>
									<span>{ item.title }</span>
								</button>
							</li>

						);

					})

				}
			</ul>
		</div>

	);

}

export default Tabs;