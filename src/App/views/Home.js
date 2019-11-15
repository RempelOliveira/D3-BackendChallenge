import React, { Fragment, useState } from "react";

import axios from "axios";
import shortid from "shortid";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

import CollapsibleArea from "./Components/CollapsibleArea";

function Home()
{
	const [isLoading, setIsLoading] =
		useState(false);

	const [items, setItems] =
		useState("");

	const handleClick = () =>
	{
		setItems(
			""

		);

		setIsLoading(true);

		axios.get(process.env.REACT_APP_API_URI, { params: {}, headers: { "X-Requested-With": "XMLHttpRequest" }})

			.then(response =>
			{
				let data = response.data;

				setItems(
					data.items

				);

				setIsLoading(false);

			})

			.catch(error =>
			{
				console.log(error);

			});

	}

	return (
		<main>
			<section id="home">
				<div className="hero has-background-grey-light is-fullheight">
					<div className="hero-body">
						<div className="container">
							<div className="box">
								<div className="levels">
									<div className="level-left">
										<div className="level-item">
											<LaddaButton
												loading			   = { isLoading }
												data-style		   = { ZOOM_OUT }
												data-spinner-size  = { 30 }
												data-spinner-lines = { 12 }
												data-color		   = "purple"
												data-spinner-color = "#ffffff"
												onClick			   = { handleClick }

											>
												Start WebCrawler
											</LaddaButton>
										</div>
										<div className="level-item">
											<span>https://elixir-lang.org</span>
										</div>
									</div>
								</div>
								{
									!items ? "" :
										<Fragment>
											<div className="verticalSpace h4x"></div>
											{
												Object.keys(items).map(i =>
												{
													return (
														<div
															key 	  = { shortid.generate() }
															className = "levels"

														>
															<div className="level-item">
																<CollapsibleArea
																	title   = { i }
																	content = { items[i] }
																/>
															</div>
															<div className="verticalSpace"></div>
														</div>

													);

												})

											}
										</Fragment>
								}
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>

	);

};

export default Home;