
var helpers = require('./helpers');

var providerRequires = {
    address: require('./providers/address'),
    color: require('./providers/color'),
    date: require('./providers/date'),
    internet: require('./providers/internet'),
    misc: require('./providers/misc'),
    number: require('./providers/number'),
    payment: require('./providers/payment'),
    person: require('./providers/person'),
    text: require('./providers/text')
};

var localeRequires = {
    'ar_SY': {
         address: require('./providers/ar_SY/address'),
         color: require('./providers/ar_SY/color'),
         person: require('./providers/ar_SY/person'),
         text: require('./providers/ar_SY/text')
    },
    'de_DE': {
         address: require('./providers/de_DE/address'),
         date: require('./providers/de_DE/date'),
         person: require('./providers/de_DE/person'),
         text: require('./providers/de_DE/text')
    },
    'en_CA': {
         address: require('./providers/en_CA/address')
    },
    'en_US': {
         address: require('./providers/en_US/address')
    },
    'fr_FR': {
         address: require('./providers/fr_FR/address'),
         person: require('./providers/fr_FR/person')
    },
    'id_ID': {
         address: require('./providers/id_ID/address')
    },
    'it_CH': {
         address: require('./providers/it_CH/address'),
         date: require('./providers/it_CH/date'),
         person: require('./providers/it_CH/person')
    },
    'it_IT': {
         address: require('./providers/it_IT/address'),
         date: require('./providers/it_IT/date'),
         person: require('./providers/it_IT/person')
    },
    'nb_NO': {
         address: require('./providers/nb_NO/address'),
         color: require('./providers/nb_NO/color'),
         date: require('./providers/nb_NO/date'),
         person: require('./providers/nb_NO/person')
    },
    'nl_NL': {
         address: require('./providers/nl_NL/address'),
         person: require('./providers/nl_NL/person')
    },
    'pt_BR': {
         address: require('./providers/pt_BR/address'),
         color: require('./providers/pt_BR/color'),
         person: require('./providers/pt_BR/person')
    },
    'ro_RO': {
         address: require('./providers/ro_RO/address'),
         date: require('./providers/ro_RO/date'),
         person: require('./providers/ro_RO/person')
    },
    'ru_RU': {
         address: require('./providers/ru_RU/address'),
         color: require('./providers/ru_RU/color'),
         internet: require('./providers/ru_RU/internet'),
         person: require('./providers/ru_RU/person'),
         text: require('./providers/ru_RU/text')
    },
    'sv_SE': {
         address: require('./providers/sv_SE/address'),
         person: require('./providers/sv_SE/person'),
         text: require('./providers/sv_SE/text')
    },
    'uk_UA': {
         address: require('./providers/uk_UA/address'),
         color: require('./providers/uk_UA/color'),
         text: require('./providers/uk_UA/text')
    }
};
var safe_require = function(locale, provider) {
	return localeRequires[locale][provider] || {};
};


var require_provider = function(provider) {
    return providerRequires[provider] || {};
};



var build_casual = function() {
	var casual = helpers.extend({}, helpers);

	casual.functions = function() {
		var adapter = {};

		Object.keys(this).forEach(function(name) {
			if (name[0] === '_') {
				adapter[name.slice(1)] = casual[name];
			}
		});

		return adapter;
	};

	var providers = [
		'address',
		'text',
		'internet',
		'person',
		'number',
		'date',
		'payment',
		'misc',
		'color'
	];

	casual.register_locale = function(locale) {
		casual.define(locale, function() {
			var casual = build_casual();

			providers.forEach(function(provider) {
				casual.register_provider(helpers.extend(
					require_provider(provider),
					safe_require(locale, provider)
				));
			});

			return casual;
		});
	}

	var locales = [
		'en_US',
		'ru_RU',
		'uk_UA',
		'nl_NL',
		'en_CA',
		'fr_FR',
		'id_ID',
		'it_CH',
		'it_IT',
		'de_DE',
		'ar_SY',
		'pt_BR',
		'nb_NO',
		'ro_RO',
		'sv_SE',
	];

	locales.forEach(casual.register_locale);

	return casual;
};

// Default locale is en_US
module.exports = build_casual().en_US;
