$(function () {
	var $signupForm = $('#SignupForm');

	$signupForm.validate({
		rules: {

			financial_resources_name: 'required',
			partner_features: {
				required: true,
				number: true
			},
			financial_resources_address: 'required',
			financial_resources_cnpj: {
				required: true,
				number: true
			},
			contact_person: 'required',
			detailing: 'required',
			disseminationPlan: 'required',
			maximum_capacity:{
				required: true,
				number: true
			},
			address_local: 'required',
			name_local: 'required',
			identification: 'required',
			agreeResources: 'required',
			
		},
		errorElement: 'em',
		submitHandler: function (form) {
			alert('submitted');
			//form.submit();
			return false;
		}
	});

	$signupForm.formToWizard({
		submitButton: 'SaveAccount',
		nextBtnClass: 'btn btn-primary next',
		prevBtnClass: 'btn btn-default prev',
		buttonTag: 'button',
		validateBeforeNext: function (form, step) {
			var stepIsValid = true;
			var validator = form.validate();
			$(':input', step).each(function (index) {
				var xy = validator.element(this);
				stepIsValid = stepIsValid && (typeof xy == 'undefined' || xy);
			});
			return stepIsValid;
		},
		progress: function (i, count) {
			$('#progress-complete').width('' + (i / count * 100) + '%');
		}
	});
});
