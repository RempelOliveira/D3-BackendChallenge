function formValidate(form)
{
	let errors = {};

	Object.keys(form).map((item) =>
	{
		if(item !== "errors")
		{
			let value 	   = form[item].value.toString().trim(),
				validation = form[item].validation;

			if(validation)
			{
				if(validation.required && !value)
					errors[item] = "Required";

			}

		}

		return form;

	});

	return Object.keys(errors).length
		? errors : true;

}

export default formValidate;