$(function () {
	var $signupForm = $('#SignupForm');

	$signupForm.validate({
		rules: {
			name: 'required',
			cpf: {
				required: true,
				number: true
			},
			address: 'required',
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true,
				number: true
			},
			mobile: {
				required: true,
				number: true
			},
			responsible: 'required',
			lattes: 'required',
			experience: 'required',
			external_participation: 'required',
			motivation: 'required',
			members_functions: 'required',
			member_name: 'required',
			member_cpf: {
				required: true,
				number: true
			},
			member_email: {
				required: true,
				email: true
			},
			member_phone: {
				required: true,
				number: true
			},
			member_mobile: {
				required: true,
				number: true
			},
			member_lattes: 'required',
			agreeMember: 'required',
			instituicao_name: 'required',
			instituicao_cnpj: {
				required: true,
				number: true
			},
			instituicao_address: 'required',
			instituicao_email: {
				required: true,
				email: true
			},
			instituicao_phone: {
				required: true,
				number: true
			},
			instituicao_responsible: 'required',
			phone_responsible: {
				required: true,
				number: true
			},
			pastParticipations: 'required',
			instituicao_historic: 'required',
			partnerships_for_pea: 'required',
			partnerships_between_institutions: 'required',
			partnerships_between_campus: 'required',
			discipline_name: 'required',
			code_discipline: 'required',
			discipline_teacher: 'required',
			n_students: {
				required: true,
				number: true
			},
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
			maximum_capacity: {
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
