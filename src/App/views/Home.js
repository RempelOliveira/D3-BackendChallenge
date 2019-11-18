import React, { Fragment, useState, useMemo } from "react";

import axios from "axios";
import shortid from "shortid";

import "ladda/dist/ladda.min.css";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import formValidate from "../../Shared/utils/FormValidate";

function Home()
{
	const [form, setForm] =	useState(
	{
		matrix:
		{
			value	  : "",
			validation:
			{
				required: true }

		},

		source:
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

	const [matrix, setMatrix] =
		useState([]);

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
		setMatrix([]);

		if(isValid === true)
		{
			setIsLoading(true);

			setForm({
				...form, errors: {}

			});

			let data =
			{
				matrix : form.matrix.value,
				source : form.source.value,
				destiny: 9

			};

			axios.get(process.env.REACT_APP_API_URI, { params: data, headers: { "X-Requested-With": "XMLHttpRequest" }})

				.then(response =>
				{
					let data = response.data;

					if(data.error === true)
					{
						setMatrix([]);
						setError(data);

					}
					else
					{
						setItems(data);
						setError("");

						setMatrix(JSON.parse(form.matrix.value));

					}

					setIsLoading(false);

				})

				.catch(error =>
				{
					setIsLoading(false);
					setError({message: "Internal error!"});

					setMatrix([]);

				});

		}
		else
		{
			setForm({
				...form, errors: isValid

			});

			setMatrix([]);

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
													Start BFS
												</LaddaButton>
											</div>
											<div className="level-item">
												<div className="field">
													<p className="input-error">{ form.errors.matrix }</p>
													<input
														type 	    = "text"
														name	   	= "matrix"
														value		= { form.matrix.value }
														className   = "input"
														placeholder = "Enter 2d matrix: [[1,1,1,1],[0,1,1,0],[0,1,0,1],[0,1,9,1],[1,1,1,1]]"
														disabled	= { isLoading }
														onChange    = { handleChangeForm }

													/>
												</div>
											</div>
											<div className="level-item">
												<div className="field">
													<p className="input-error">{ form.errors.source }</p>
													<input
														type 	    = "text"
														name	   	= "source"
														value		= { form.source.value }
														className   = "input"
														placeholder = "Enter source path: [0,0]"
														disabled	= { isLoading }
														onChange    = { handleChangeForm }

													/>
												</div>
											</div>
											<div className="level-item">
												In the matrix, the number 9 is the destination
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
															<div className="levels metrics">
																<div className="level-left">
																	<div className="level-item">
																		<div className="metric">
																			<div className="metric-item">
																				<h1>{ items.steps }</h1>
																				<h2>Steps</h2>
																			</div>
																		</div>
																	</div>
																	<div className="level-item">
																		<div className="metric">
																			<div className="metric-item">
																				<h1>{ items.source[0] }x{ items.source[1] }</h1>
																				<h2>Source Position</h2>
																			</div>
																		</div>
																	</div>
																	<div className="level-item">
																		<div className="metric">
																			<div className="metric-item">
																				<h1>{ items.position[1] }x{ items.position[0] }</h1>
																				<h2>Destiny Position</h2>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<table className="table is-bordered">
																<tbody>
																	{
																		matrix.map((row, x) =>
																		{
																			return (
																				<Fragment key={ shortid.generate() }>
																					{
																						x !== 0 ||
																							<tr>
																								{
																									row.map((cell, y) =>
																									{
																										return (
																											<Fragment key={ shortid.generate() }>
																												{
																													y !== 0 || <td className="no-border"></td>
																												}
																												<td className="no-bordered has-text-white has-background-grey">
																													<div className="table-cell">
																														{ y }
																													</div>
																												</td>
																											</Fragment>

																										);

																									})

																								}
																							</tr>
																					}
																					<tr>
																						<td className="has-text-right has-text-white has-background-grey">
																							<div className="table-cell">
																								{ x }
																							</div>
																						</td>
																						{
																							row.map((cell, y) =>
																							{
																								return (
																									<td key={ shortid.generate() } className={ items.path.map(pos => x === pos[0] && y === pos[1]).includes(true) ? "has-background-warning" : "" }>
																										<div className="table-cell">
																											{
																												x === items.source[0] && y === items.source[1]
																													?
																														<FontAwesomeIcon icon = {["fas", "street-view"]} size="lg" /> 
																													:
																														""
																											}
																											{ x === items.position[0] && y === items.position[1] ? <FontAwesomeIcon icon = {["fas", "map-marker-alt"]} size="lg" /> : ""}
																											{ cell === 0 ? <FontAwesomeIcon icon = {["fas", "exclamation-triangle"]} /> : ""}
																										</div>
																									</td>

																								);

																							})

																						}
																					</tr>
																				</Fragment>

																			);

																		})

																	}
																</tbody>
															</table>
														</Fragment>

												}
											</Fragment>

										);

									}, [items, matrix])

								}
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>

	);

}

export default Home;