(function() {
	var STORAGE_KEY = 'onboarding_seen_v1';
	function shouldShowOnboarding() {
		try {
			return localStorage.getItem(STORAGE_KEY) !== 'true';
		} catch (e) {
			return true;
		}
	}

	function markOnboardingSeen() {
		try {
			localStorage.setItem(STORAGE_KEY, 'true');
		} catch (e) {}
	}

	function bindModalEvents($) {
		var $modal = $('#onboardingModal');
		if ($modal.length === 0) return;

		$('#onboardingGetStarted').on('click', function() {
			if ($('#onboardingDontShow').is(':checked')) {
				markOnboardingSeen();
			}
		});

		$modal.on('hidden.bs.modal', function() {
			if ($('#onboardingDontShow').is(':checked')) {
				markOnboardingSeen();
			}
		});
	}

	function maybeShowModal($) {
		var $modal = $('#onboardingModal');
		if ($modal.length === 0) return;
		if (!shouldShowOnboarding()) return;
		$modal.modal('show');
	}

	if (typeof window.jQuery !== 'undefined') {
		var $ = window.jQuery;
		$(function() {
			bindModalEvents($);
			maybeShowModal($);
		});
	} else {
		// Fallback if jQuery loads later
		document.addEventListener('DOMContentLoaded', function() {
			if (typeof window.jQuery !== 'undefined') {
				var $ = window.jQuery;
				bindModalEvents($);
				maybeShowModal($);
			}
		});
	}
})();

