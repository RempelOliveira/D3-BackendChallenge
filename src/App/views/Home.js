import React, { Fragment, useState, useMemo } from "react";

import axios from "axios";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";

import shortid from "shortid";
import CollapsibleArea from "./Components/CollapsibleArea";

import formValidate from "../../Shared/utils/FormValidate";

function Home()
{
	const [form, setForm] =	useState(
	{
		domain:
		{
			value	  : "",
			validation:
			{
				required: true }

		},

		errors: {}

	});

	const [isLoading, setIsLoading] =
		useState(false);

	const [items, setItems] =
		useState("");

	const [error, setError] =
		useState("");

	const handleChangeForm = (event) =>
	{
		setForm({
			...form, [event.target.name]: Object.assign({}, form[event.target.name],
			{
				value: event.target.value

			})

		});

	}

	const handleSubmit = (event) =>
	{
		event.preventDefault();

		const isValid =
			formValidate(form);

		setItems("");

		if(isValid === true)
		{
			setIsLoading(true);

			setForm({
				...form, errors: {}

			});

			let data =
			{
				domain: form.domain.value

			};

			axios.get(process.env.REACT_APP_API_URI, { params: data, headers: { "X-Requested-With": "XMLHttpRequest" }})

				.then(response =>
				{
					let data = response.data;

					if(data.error === true)
					{
						setError(data);

					}
					else
					{
						setItems(data);
						setError("");

					}

					setIsLoading(false);

				})

				.catch(error =>
				{
					setIsLoading(false);
					setError({message: "Internal error!"});

				});

		}
		else
		{
			setForm({
				...form, errors: isValid

			});

		}

	}
	
	return (
		<main>
			<section id="home">
				<div className="hero has-background-grey-light is-fullheight">
					<div className="hero-body">
						<div className="container">
							<div className="box">
								<form onSubmit={ handleSubmit }>
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

												>
													Start WebCrawler
												</LaddaButton>
											</div>
											<div className="level-item">
												<div className="field">
													<p className="input-error">{ form.errors.domain }</p>
													<input
														type 	    = "text"
														name	   	= "domain"
														value		= { form.domain.value }
														className   = "input"
														placeholder = "Enter domain: https://elixir-lang.org/"
														disabled	= { isLoading }
														onChange    = { handleChangeForm }

													/>
												</div>
											</div>
										</div>
									</div>
								</form>
								{
									!error ? "" :
										<p className="response-error">
											{ error.message }
										</p>

								}
								{
									useMemo(() =>
									{
										return (
											<Fragment>
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
											</Fragment>

										);

									}, [items])

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