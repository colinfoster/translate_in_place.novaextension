
exports.activate = function() {}
exports.deactivate = function() {}
nova.commands.register("tip.translate", handle_translate );
nova.commands.register("tip.resolve_language_menu", resolve_language_menu );


// ---------------------------------------------------------------------------------------------- //
/*	resolve_language_menu

	An enum 'resolve' routine is needed because the alphabetical order of the languages changes
	depending on the localization we're using for the current user.
*/
// ---------------------------------------------------------------------------------------------- //

function resolve_language_menu()
{	// This preference doesn't currently work as the default we'll still use it to determine the
	// language that should be used for displaying the languages.
	var user_lang = _l('_config.user_lang');
	if( !user_lang || user_lang === '_config.user_lang')	// Shouldn't be impossible, but...
		user_lang = 'en';
	
	const l = require('../' + user_lang + '.lproj/languages.js');
	
	return l.languages;
}


// ---------------------------------------------------------------------------------------------- //
/*	handle_translate
	
	Handles the incoming "Translate in Place" command event.
*/
// ---------------------------------------------------------------------------------------------- //

function handle_translate( workspace )
{
	try
	{
		var prefs             = get_translation_prefs();
		var untranslated_text = workspace.selectedText.trim();
		if( !untranslated_text.length )
			return;
		
		do_replace.workspace     = workspace;				// Kluge. Pass along the workspace for use later.
		
		tx_translate( untranslated_text, prefs );	// Transmit the translation request.
	}
	catch( error )
	{
		rc_log( error );
		nova_notify( _l('_err.error'), error.message, 8000 );
	}
}


// ---------------------------------------------------------------------------------------------- //
/*	tx_translate
	
	Transmit the translate request.
*/
// ---------------------------------------------------------------------------------------------- //

function tx_translate( untranslated_text, prefs )
{
	var url_template = "https://www.googleapis.com/language/translate/v2?key=%key%&source=%from%&target=%to%&q=%@";
	
	var url = url_template
		.replace('%key%', encodeURI( prefs['google_api_key'] ) )
		.replace('%from%', prefs['translate_from'])
		.replace('%to%', prefs['translate_to'])
		.replace('%@', encodeURI( untranslated_text ) );
	 
	fetch( url )
		.then( response =>
		{
			if( response.ok )
				return response.json();
			
			nova_notify('_err.error', '_err.network', 8000 );
		} )
		.then( rx_translate );
}


// ---------------------------------------------------------------------------------------------- //
/*	rx_translate
	
	Receive the translate request response.
*/
// ---------------------------------------------------------------------------------------------- //

function rx_translate( data )
{	// Extract the translated text from the data response.
	var	translated_text = rc_obj_lookup( ['data', 'translations', 0, 'translatedText'], data );
	if( !translated_text )
	{
		rc_log( data );
		nova_notify( _l('_err.error'), _l('_err.bad_response'), 8000 );
		return;
	}
	
	do_replace( translated_text );
}


// ---------------------------------------------------------------------------------------------- //
/*	do_replace
*/
// ---------------------------------------------------------------------------------------------- //

function do_replace( translated_text )
{
	var workspace = do_replace.workspace;
	var range  = workspace.selectedRange;
	
	// Fetch any start/end markers that have been specified.
	var start_marker = nova.workspace.config.get('tip.mark_translations');
	var end_marker   = '';
	
	if( start_marker )
	{
		end_marker   = start_marker.substr( 2, 2 );
		start_marker = start_marker.substring( 0, 2 );
	}
	
	workspace.edit( ( te ) =>
	{
		te.replace( range, start_marker + translated_text + end_marker );
	} );
}

// ---------------------------------------------------------------------------------------------- //
/*	get_resource_id_from_prefs
*/
// ---------------------------------------------------------------------------------------------- //

function get_translation_prefs( syntax )
{
	var prefs =
	{
		'google_api_key': nova.config.get('tip.google_api_key'),
		'translate_from': nova.workspace.config.get('tip.translate_from'),
		'translate_to':   nova.workspace.config.get('tip.translate_to'),
	};
	
	if( !prefs['google_api_key'] )
		throw new Error( _l('_err.no_api_key') );
	
	if( !prefs['translate_from'] || !prefs['translate_to'] )
		throw new Error( _l('_err.cant_load_prefs', syntax ) );
	
	return prefs;
}


// ---------------------------------------------------------------------------------------------- //
/*	nova_notify
	
	Show a standard notification prompt
*/
// ---------------------------------------------------------------------------------------------- //

function nova_notify( title, body, duration )
{
	var fn        = nova_notify;
	var note_id   = 'rtfm-notify';
	
	if( typeof( duration ) === 'undefined' )
		duration = 8000;
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
	/*	show
	*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
	
	fn.show = function()
	{
		fn.hide();		// Hide any previous notification we posted.
		
		var request     = new NotificationRequest( note_id );
		
		request.title   = _l( title );
		request.body    = _l( body );
		request.actions = [ _l('_prompt.dismiss') ];
		
		nova.notifications.add( request );
		
		if( duration )
			fn[ note_id ] = setTimeout( fn.hide, duration );
	}
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
	/*	hide
	*/
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//

	fn.hide = function()
	{	// NOTE: fn[ note_id ] may contain a valid 'timeout' id of 0.
		if( typeof( fn[ note_id ] ) === 'undefined' || fn[ note_id ] === false )
			return;
		
		clearTimeout( fn[ note_id ] );
		nova.notifications.cancel( note_id );
		fn[ note_id ] = false;
	}
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
	
	fn.show();
}


// ---------------------------------------------------------------------------------------------- //
/*	_l - Localization

	Takes any number of arguments following the key which are replaced in the requested string.
	The first argument after the key replaces '%@1', the 2nd replaces '%@2', etc.
*/
// ---------------------------------------------------------------------------------------------- //

function _l( key )
{
	var str = nova.localize( key );
	
	// Arguments are replaced in reverse order so we replace %@11 (if it exists) before %@1.
	for( var i = arguments.length - 1; i > 0; i-- )
		str = str.replace('%@'+i, nova.localize( arguments[ i ] ) );
	
	return str;
}


// ============================================================================================== //
// RC LIBRARY ITEMS
// ============================================================================================== //

// ---------------------------------------------------------------------------------------------- //
/*	rc_type - v1.0.0 2022-06-21
	
	Does all the types typeof does, plus:
	'null', 'undefined','array', 'error', 'date', 'set', 'map', 'object', and any other class name.
*/
// ---------------------------------------------------------------------------------------------- //

function rc_type( o )
{
	return Object.prototype.toString.call(o).slice( 8, -1 ).toLowerCase();
}


// ---------------------------------------------------------------------------------------------- //
/*	rc_obj_lookup - v1.0.2 2022-06-21
	
	If keys is a string, returns the value stored at o[ key ], if it exists.
	
	If keys is an array of strings, it tries to dig through the passed object for the value of
	the key nested at the bottom of the key list.
	
	e.g., if keys is ['one', 'two', 'three']. It tries to return
		o.one.two.three
	if it exists.
	
	If it's not found it will return the optional parameter or_else.
	If or_else isn't passed it would return an 'undefined' value on failure.
*/
// ---------------------------------------------------------------------------------------------- //

function rc_obj_lookup( keys, o, or_else )
{
	if( rc_type( o ) !== 'object' )
		return or_else;
	
	if( ['string', 'number'].indexOf( rc_type( keys ) ) !== -1 )
		keys = [ keys ];
	
	if( rc_type( keys ) !== 'array' )
		return or_else;
	
	var return_value = or_else;
	var last_index = keys.length - 1;
	
	keys.forEach( function ( key, i )
	{
		if( o === null || typeof( o[ key ] ) === 'undefined' )
			return false;	// Halt the loop.
		
		if( i < last_index )
			o = o[ key ];
		else
			return_value = o[ key ];
	} );
	
	return return_value;
}


// ---------------------------------------------------------------------------------------------- //
/*	rc_log - v2.1.1 2022-08-11
*/
// ---------------------------------------------------------------------------------------------- //

function rc_log()
{
	rc_log.id++;
	
	var log_type_and_value = function( type, value, prefix )
	{
		value = ['null','undefined'].indexOf( type ) === -1 ? " (" + value.toString() + ")" : '';
		
		console.log( prefix + type + value );
	};
	
	try{ var caller_name = arguments.callee.caller.name ? arguments.callee.caller.name : 'anon'; }
	catch( e ){ caller_name = 'unknown'; }
	
	console.log( "= " + rc_log.id + " =======================  " + caller_name + "()" );
		
	for( var i = 0; i < arguments.length; i++ )
	{
		var o = arguments[ i ];
		var type = rc_type( o );
		
		if( ['array','object'].indexOf( type ) > -1 )
		{
			var keys = Object.keys( o );
			if( !keys.length )
				log_type_and_value( type, o, "- " );
			else
			{
				console.log('{');
				keys.forEach( function( key )
				{
					log_type_and_value( rc_type( o[ key ] ), o[ key ], '   "' + key + '": ' );
				} );
				console.log('}');
			}
		}
		else if( type === 'error')
			console.log( "X Line " + o.line + ":" + o.column + " " + o.message );
		else
			log_type_and_value( type, o, "- " );
	}
}
rc_log.id = 0;
dbg = rc_log;	// To differentiate between temporary and permanent logging.

// ---------------------------------------------------------------------------------------------- //
