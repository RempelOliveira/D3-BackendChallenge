import React from "react";
import { Link } from "react-router-dom";

function PageNotFound()
{
	return (
		<main>
			<section id="page-not-found">
				<div className="hero has-background-grey-light is-fullheight">
					<div className="hero-body">
						<div className="container">
							<div className="box has-text-centered">
								<h1>
									404 - Page not found
								</h1>
								<div className="go-home">
									<Link
										to 		= "/"
										replace = { true }

									>
										GO HOME
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>

	);

};

export default PageNotFound;